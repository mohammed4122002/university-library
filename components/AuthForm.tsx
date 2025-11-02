"use client"


import { zodResolver } from '@hookform/resolvers/zod'
import React, { use } from 'react'
import { DefaultValues, FieldValues, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import { ZodType } from 'zod';
interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}
const AuthForm <T extends FieldValues>  = ({type , schema , defaultValues , onSubmit}:props<T>) => {
 
 const form: UseFormReturn<T> = useForm({
      resolver: zodResolver(schema),
      defaultValues : defaultValues as DefaultValues<T>,
 })
 const handleFormSubmit : SubmitHandler<T> = async (data) => {
    await onSubmit(data);
 }
  return (
    <div>AuthForm</div>
  )
}

export default AuthForm