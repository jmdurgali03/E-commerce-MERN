'use client';

import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import { signIn } from "next-auth/react";
const AddUsersForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            role: 'user',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        
        axios.post('/api/users', data).then(() => {
            toast.success('Account created')
  
            signIn('credentials', {
              email: data.email,
              password: data.password,
              redirect: false,
            }).then((callback) => {
              if(callback?.ok){
                toast.success('Correctly created new user!');
                reset();
              }
  
              if(callback?.error){
                toast.error(callback.error)
              }
            });
          }).catch(() => toast.error("Something went wrong")).finally(() => {
            setIsLoading(false)
          }
          );
    };

    return (
        <>
            <Heading tittle="Add User" center />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"
            />
            <Input
                id="role"
                label="Role"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Button label={isLoading ? "Loading" : "Create User"} onClick={handleSubmit(onSubmit)} />
        </>
    );
};

export default AddUsersForm;

