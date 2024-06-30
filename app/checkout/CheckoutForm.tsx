"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import {
  PaymentElement,
  useElements,
  useStripe,
  AddressElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/Button";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
    handleSetPaymentSuccess(false);
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "cash") {
      toast.success("Cash payment selected. Please prepare the amount.");
      handleClearCart();
      handleSetPaymentSuccess(true);
      handleSetPaymentIntent(null);
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Checkout Success");
          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        } else {
          toast.error(result.error.message || "Checkout Failed");
        }

        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6">
        <Heading tittle="Enter your details to complete checkout" />
      </div>
      <h2 className="font-semibold mb-2">Address Information</h2>
      <AddressElement
        options={{
          mode: "shipping",
          allowedCountries: ["US", "AR"],
        }}
      />
      <div className="mb-4">
        <label className="block font-semibold mb-2">
          Select Payment Method:
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
              className="mr-2"
            />
            Credit Card
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
              className="mr-2"
            />
            Cash
          </label>
        </div>
      </div>
      {paymentMethod === "card" && (
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      )}
      <div className="py-4 text-center text-slate-700 text-xl font-bold">
        Total: {formattedPrice}
      </div>
      <Button
        label={isLoading ? "Processing" : "Pay now"}
        disabled={isLoading || !stripe || !elements}
        onClick={() => {}}
      />
    </form>
  );
};

export default CheckoutForm;
