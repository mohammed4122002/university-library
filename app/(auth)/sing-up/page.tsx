"use client"

import AuthForm from "@/components/AuthForm"

const Page = () => {
  const handleSubmit = async () => {
    return { success: true }
  }

  return (
    <AuthForm
      type="SIGN_UP"
      onSubmit={handleSubmit}
    />
  )
}

export default Page
