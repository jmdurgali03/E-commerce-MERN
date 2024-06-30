'use client';

import { CartProductType } from "@/app/product/[productId]/ProductDetails";

interface SetQtyProps{
    cartCounter?: boolean;
    cartProduct: CartProductType;
    handleQtyIncrease: () => void;
    handleQtyDecrease: () => void;
}

const btnSyles = 'border-[1.2px] border-slate-300 px-2 rounded'

const SetQuantity: React.FC<SetQtyProps> = ({
    cartProduct, 
    cartCounter, 
    handleQtyDecrease, 
    handleQtyIncrease
}) => {
    return ( 
    <div className="flex gap-8 items-center">
        {cartCounter ? null : <div className="font-semibold">QUANTITY:</div>}
        <div className="flex gap-4 items-center text-base">
            <button onClick={handleQtyDecrease} className={btnSyles}>-</button>
            <div>{cartProduct.quantity}</div>
            <button onClick={handleQtyIncrease} className={btnSyles}>+</button>
        </div> 
    </div> 
    );
}
 
export default SetQuantity;