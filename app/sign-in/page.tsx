'use client'

import * as React from 'react'
// import { useSignIn } from '@clerk/nextjs'
// import {  PhoneCodeFactor, SignInFirstFactor } from '@clerk/types'
// import { useRouter } from 'next/navigation'
import { CarouselDemo } from '@/components/login/carousel'
import { SignUpForm } from '@/components/login/login-signup'
import { Link, MessageSquare } from 'lucide-react'

export default function Page() {
  // const { isLoaded, signIn, setActive } = useSignIn()
  // // const [verifying, setVerifying] = React.useState(false)
  // // const [phone, setPhone] = React.useState('')
  // const [code, setCode] = React.useState('')
  // const router = useRouter()

  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault()

  //   if (!isLoaded && !signIn) return null

  //   try {
  //     // Start the sign-in process using the phone number method
  //     const { supportedFirstFactors } = await signIn.create({
  //       identifier: phone,
  //     })

  //     // Filter the returned array to find the 'phone_code' entry
  //     const isPhoneCodeFactor = (factor: SignInFirstFactor): factor is PhoneCodeFactor => {
  //       return factor.strategy === 'phone_code'
  //     }
  //     const phoneCodeFactor = supportedFirstFactors?.find(isPhoneCodeFactor)

  //     if (phoneCodeFactor) {
  //       // Grab the phoneNumberId
  //       const { phoneNumberId } = phoneCodeFactor

  //       // Send the OTP code to the user
  //       await signIn.prepareFirstFactor({
  //         strategy: 'phone_code',
  //         phoneNumberId,
  //       })

  //       // Set verifying to true to display second form
  //       // and capture the OTP code
  //       setVerifying(true)
  //     }
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (err: any) {
  //     // See https://clerk.com/docs/custom-flows/error-handling
  //     // for more info on error handling
  //     console.error('Error:', JSON.stringify(err, null, 2))
  //     if (err.status == 422) {
  //       router.push('sign-up')
  //     }
  //   }
  // }

  // async function handleVerification(e: React.FormEvent) {
  //   e.preventDefault()

  //   if (!isLoaded && !signIn) return null

  //   try {
  //     // Use the code provided by the user and attempt verification
  //     const signInAttempt = await signIn.attemptFirstFactor({
  //       strategy: 'phone_code',
  //       code,
  //     })

  //     // If verification was completed, set the session to active
  //     // and redirect the user
  //     if (signInAttempt.status === 'complete') {
  //       await setActive({ session: signInAttempt.createdSessionId })

  //       router.push('/')
  //     } else {
  //       // If the status is not complete, check why. User may need to
  //       // complete further steps.
  //       console.error(signInAttempt)
  //     }
  //   } catch (err) {
  //     // See https://clerk.com/docs/custom-flows/error-handling
  //     // for more info on error handling
  //     console.error('Error:', JSON.stringify(err, null, 2))
  //   }
  // }

  // if (verifying) {
  //   return (
  //     <>
  //       <h1>Verify your phone number</h1>
  //       <form onSubmit={handleVerification}>
  //         <label htmlFor="code">Enter your verification code</label>
  //         <input value={code} id="code" name="code" onChange={(e) => setCode(e.target.value)} />
  //         <button type="submit">Verify</button>
  //       </form>
  //     </>
  //   )
  // }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Section - Preview */}
      <div className="hidden lg:flex bg-blue-500 text-white flex-col items-center justify-center relative p-8">
        <h2 className="text-3xl font-bold text-center mb-8 max-w-2xl">
          Social media shared today, tomorrow or by location
        </h2>
        <div className="w-full max-w-2xl">
          <CarouselDemo />
        </div>
      </div>

      {/* Right Section - Form */}
      <div className='m-auto p-4'>
        <FormSection />
      </div>
    </div>
  )
}

function FormSection() {
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-8 w-[400] h-[500]">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-center lg:justify-start">
          <Link className="flex items-center justify-center mb-6" href="/">
            <MessageSquare className="h-12 w-12 text-blue-400" />
            <span className="ml-6 text-4xl font-medium">Billbox</span>
           </Link>
          </div>
          <SignUpForm />
        </div>
    </div>
  )
}