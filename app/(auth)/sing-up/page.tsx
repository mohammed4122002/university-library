"use client"

import AuthForm from "@/components/AuthForm"
import { signUp } from "@/lib/actions/auth"

const Page = () => {
 

  return (
    <AuthForm
      type="SIGN_UP"
      onSubmit={signUp}
    />
  )
}

export default Page
