"use client";

import { formatPrice } from "@/utils/formatPrice";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";

interface ItemContentProps {
    item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
    const { handleRemoveProductFromCart, handleCartQtyIncrease, handleCartQtyDecrease } = useCart();

    return (
        <div className="
            grid 
            grid-cols-5
            text-sm
            md:text-base
            gap-4
            border-b
            border-gray-300
            py-4
            items-center
        ">
            <div className="
                col-span-2
                justify-self-start
                flex
                gap-4
            ">
                <Link href={`/product/${item.id}`}>
                    <div className="relative w-[70px] md:w-[100px] aspect-square">
                        <Image 
                            src={item.selectedImg.image} 
                            alt={item.name} 
                            fill 
                            className="object-contain"
                        />  
                    </div>
                </Link>
                <div className="flex flex-col justify-between">
                    <Link href={`/product/${item.id}`} className="text-gray-800 hover:text-blue-600 transition">
                        {truncateText(item.name)}
                    </Link>
                    <div className="text-gray-600">{item.selectedImg.color}</div>
                    <button 
                        className="text-gray-500 underline hover:text-red-600 transition"
                        onClick={() => handleRemoveProductFromCart(item)}
                    >
                        Remove
                    </button>
                </div>
            </div>
            <div className="text-gray-800">
                {formatPrice(item.price)}
            </div>
            <div className="text-gray-800">
                <SetQuantity 
                    cartCounter={true}
                    cartProduct={item}
                    handleQtyIncrease={() => handleCartQtyIncrease(item)}
                    handleQtyDecrease={() => handleCartQtyDecrease(item)}
                />
            </div>
            <div className="justify-self-end font-semibold text-gray-800">
                {formatPrice(item.price * item.quantity)}
            </div>
        </div>
    );
}

export default ItemContent;
