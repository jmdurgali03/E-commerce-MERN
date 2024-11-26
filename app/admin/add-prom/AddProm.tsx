'use client';

import { useState, useEffect } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import toast from "react-hot-toast";

interface Promotion {
  name: string;
  code: string;
  discount: number;
  startDate: string;
  endDate: string;
}

const PromotionsForm: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      code: '',
      discount: '',
      startDate: '',
      endDate: '',
    }
  });

  useEffect(() => {
    const storedPromotions = localStorage.getItem("promotions");
    if (storedPromotions) {
      setPromotions(JSON.parse(storedPromotions));
    }
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const newPromotion = {
      name: data.name,
      code: data.code,
      discount: parseFloat(data.discount),
      startDate: data.startDate,
      endDate: data.endDate,
    };

    const updatedPromotions = [...promotions, newPromotion];
    setPromotions(updatedPromotions);
    localStorage.setItem("promotions", JSON.stringify(updatedPromotions));
    reset();
    toast.success("Promotion added successfully!");
  };

  const handleDelete = (index: number) => {
    const updatedPromotions = promotions.filter((_, i) => i !== index);
    setPromotions(updatedPromotions);
    localStorage.setItem("promotions", JSON.stringify(updatedPromotions));
    toast.success("Promotion deleted successfully!");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <Heading tittle="Promotions" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          id="name"
          label="Name"
          type="text"
          disabled={false}
          required={true}
          register={register}
          errors={errors}
        />
        <Input
          id="code"
          label="Code"
          type="text"
          disabled={false}
          required={true}
          register={register}
          errors={errors}
        />
        <Input
          id="discount"
          label="Discount (%)"
          type="number"
          disabled={false}
          required={true}
          register={register}
          errors={errors}
        />
        <Input
          id="startDate"
          label="Start Date"
          type="date"
          disabled={false}
          required={true}
          register={register}
          errors={errors}
        />
        <Input
          id="endDate"
          label="End Date"
          type="date"
          disabled={false}
          required={true}
          register={register}
          errors={errors}
        />
        <Button
          label="Add Promotion"
          onClick={() => { }}
          custom="bg-blue-600 text-white hover:bg-blue-700 w-full py-3"
        />
      </form>

      <div className="mt-10">
        <Heading tittle="Active Promotions" />
        {promotions.length > 0 ? (
          <ul className="space-y-6">
            {promotions.map((promo, index) => (
              <li
                key={index}
                className="p-6 bg-gray-100 rounded-lg shadow-md flex flex-col space-y-3"
              >
                <h3 className="text-xl font-semibold text-gray-800">{promo.name}</h3>
                <p className="text-gray-700">
                  <span className="font-medium">Code:</span> {promo.code}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Discount:</span> {promo.discount}%
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Valid from:</span> {promo.startDate} to {promo.endDate}
                </p>
                <Button
                  label="Delete"
                  onClick={() => handleDelete(index)}
                  custom="bg-red-500 text-white hover:bg-red-600 w-full"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No promotions available.</p>
        )}
      </div>
    </div>

  );
};

export default PromotionsForm;
