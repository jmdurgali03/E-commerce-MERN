import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);

  const price = Math.floor(totalPrice * 100); // Convertir a centavos

  return price;
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  try {
    const body = await request.json();
    const { items, payment_intent_id } = body;
    const total = calculateOrderAmount(items);

    const orderData = {
      user: { connect: { id: currentUser.id } },
      amount: total,
      status: "pending",
      deliveryStatus: "pending",
      paymentIntentId: payment_intent_id,
      products: items,
      currency: "usd",
    };

    if (payment_intent_id) {
      const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

      if (current_intent) {
        const updated_intent = await stripe.paymentIntents.update(payment_intent_id, { amount: total });

        const existing_order = await prisma.order.findFirst({
          where: { paymentIntentId: payment_intent_id },
        });

        if (!existing_order) {
          return NextResponse.error();
        }

        await prisma.order.update({
          where: { paymentIntentId: payment_intent_id },
          data: {
            amount: total,
            products: items,
          },
        });

        return NextResponse.json({ paymentIntent: updated_intent });
      }
    } else {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
      });

      orderData.paymentIntentId = paymentIntent.id;

      await prisma.order.create({
        data: orderData,
      });

      return NextResponse.json({ paymentIntent });
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.error();
  }
}
