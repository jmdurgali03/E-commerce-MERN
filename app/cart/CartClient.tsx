"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

interface CartClientProps {
    currentUser: SafeUser | null;
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
    const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
    const router = useRouter();

    const [promoCode, setPromoCode] = useState<string>("");
    const [discount, setDiscount] = useState<number>(0);
    const [finalTotal, setFinalTotal] = useState<number>(cartTotalAmount);

    useEffect(() => {
        const discountedTotal = cartTotalAmount - (cartTotalAmount * discount) / 100;
        setFinalTotal(discountedTotal);
    }, [cartTotalAmount, discount]);

    const applyPromoCode = () => {
        const promotions = JSON.parse(localStorage.getItem("promotions") || "[]");
        const validPromo = promotions.find((promo: any) => promo.code === promoCode);

        if (validPromo) {
            setDiscount(validPromo.discount);
            alert(`Promo code applied! ${validPromo.discount}% off.`);
        } else {
            setDiscount(0);
            alert("Invalid promo code.");
        }
    };

    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className="flex flex-col items-center py-16">
                <div className="text-2xl text-gray-800">Your cart is empty</div>
                <div>
                    <Link href={"/"} className="
                        text-blue-600
                        flex
                        items-center
                        mt-4
                    ">
                        <MdArrowBack size={20} />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <Heading tittle="Your Cart" />
            <div className="space-y-4">
                {cartProducts.map((product, index) => (
                    <ItemContent key={index} item={product} />
                ))}
            </div>

            <div className="mt-6">
                <h2 className="text-lg font-semibold">Cart Summary</h2>
                <div className="flex justify-between items-center py-2">
                    <span>Subtotal:</span>
                    <span>{formatPrice(cartTotalAmount)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                    <span>Discount:</span>
                    <span>{discount}%</span>
                </div>
                <div className="flex justify-between items-center py-2 font-bold">
                    <span>Total:</span>
                    <span>{formatPrice(finalTotal)}</span>
                </div>
            </div>

            <div className="mt-4 flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md w-full"
                />
                <Button
                    label="Apply Promo Code"
                    onClick={applyPromoCode}
                    disabled={!promoCode}
                />
                <Button
                    label="Proceed to Checkout"
                    onClick={() => router.push("/checkout")}
                />
                <Button
                    label="Clear Cart"
                    onClick={handleClearCart}
                    outline
                />
            </div>
        </div>
    );
};

export default CartClient;