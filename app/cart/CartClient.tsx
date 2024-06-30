"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

interface CartClientProps{
    currentUser: SafeUser | null
}

const CartClient: React.FC<CartClientProps> = ({currentUser}) => {
    const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
    const router = useRouter();

    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className="flex flex-col items-center py-16">
                <div className="text-2xl text-gray-800">Your cart is empty</div>
                <div>
                    <Link href={"/"} className="
                        text-blue-600
                        flex
                        items-center
                        gap-1
                        mt-2
                        hover:text-blue-800
                        transition
                    ">
                        <MdArrowBack />
                        <span>Start Shopping</span>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto py-16 px-4">
            <Heading tittle="Shopping Cart" center />
            <div className="
                grid
                grid-cols-5
                text-sm
                gap-4
                pb-4
                items-center
                mt-8
                border-b
                border-gray-200
            ">
                <div className="col-span-2 justify-self-start font-semibold text-gray-800">PRODUCT</div>
                <div className="justify-self-start font-semibold text-gray-800">PRICE</div>
                <div className="justify-self-start font-semibold text-gray-800">QUANTITY</div>
                <div className="justify-self-end font-semibold text-gray-800">TOTAL</div>
            </div>
            <div>
                {cartProducts && cartProducts.map((item) => {
                    return <ItemContent key={item.id} item={item} />;
                })}
            </div>
            <div className="border-t border-gray-200 py-4 flex justify-between items-center">
                <div className="w-[90px]">
                    <Button label="Clear Cart" onClick={() => { handleClearCart() }} small outline />
                </div>
                <div className="text-sm flex flex-col gap-1 items-end">
                    <div className="flex justify-between w-full text-base font-semibold">
                        <span>Subtotal</span>
                        <span>{formatPrice(cartTotalAmount)}</span>
                    </div>
                    <p className="text-gray-500">Taxes and shipping calculated at checkout</p>
                    <Button 
                      label={currentUser ? 'Checkout' : 'Login to Checkout'}
                      outline={currentUser ? false : true}
                      onClick={() => {currentUser ? router.push('/checkout') : router.push('/login')}} 
                    />
                    <Link href={"/"} className="
                        text-blue-600
                        flex
                        items-center
                        gap-1
                        mt-2
                        hover:text-blue-800
                        transition
                    ">
                        <MdArrowBack />
                        <span>Continue Shopping</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CartClient;
