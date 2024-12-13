"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PencilLine } from "lucide-react";
import { OtpVerification } from "./otp-verification";
import { useSignIn } from "@clerk/nextjs";

export function SignUpForm() {
  const { isLoaded } = useSignIn();
  const [phone, setPhone] = useState("");
  const [agree, setAgreed] = useState<boolean>(false);
  // const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone"); // 'phone' or 'otp'
  const [sessionId, setSessionId] = useState("");

  if (!isLoaded) {
    return null;
  }

  const handleSendOtp = async () => {
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setSessionId(data.sessionId);
      setStep("otp");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleVerifyOtp = async (e: any, otp: string) => {
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, otp, sessionId }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      alert("Authentication Successful!");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const response = await signIn.create({
  //       identifier: phoneNumber,
  //       strategy: "phone_code",
  //     });
  //     console.log(response)
  //     setShowOtpVerification(true);
  //     // "unverified" | "verified" | "transferable" | "failed" | "expired"
  //     // Check if user exists or if this is the first login
  //     // const isFirstLogin = response.firstFactorVerification?.status === "unverified";

  //     // if (isFirstLogin) {
  //     //   // Redirect to a page to collect additional user information
  //     //   // window.location.href = `/collect-info?phone=${encodeURIComponent(phoneNumber)}`;
  //     //   setShowOtpVerification(true);
  //     // } else {
  //     //   // Redirect to OTP verification page
  //     //   window.location.href = "/verify-otp";
  //     // }
  //   } catch (err) {

  //     console.log(err)
  //     // setError(err.errors[0]?.message || "Something went wrong");
  //   }
  // }

  // const handleOtpVerify =  async (e: React.FormEvent, otpCode: string) => {
  //   e.preventDefault();

  //   try {
  //     const completeSignIn = await signIn.attemptFirstFactor({
  //       strategy: 'phone_code',
  //       code: otpCode,
  //     });

  //     console.log(completeSignIn)

  //     // if (completeSignIn.status === 'complete') {
  //     //   if (completeSignIn.createdSessionId) {
  //     //     window.location.href = '/dashboard';
  //     //   }
  //     // } else if (completeSignIn.status === 'needs_identifier') {
  //     //   // User does not exist, create a new user
  //     //   const newUser = await signIn.create({
  //     //     // phoneNumber,
  //     //   });

  //     //   if (newUser.id) {
  //     //     // Redirect to user info collection page
  //     //     window.location.href = '/collect-info';
  //     //   }
  //     // } else {
  //     //   setError('OTP verification failed or invalid OTP.');
  //     // }
  //   } catch (err: any) {
  //     // Handle errors during OTP verification or user creation
  //     setError(err.errors?.[0]?.message || 'An unexpected error occurred.');
  //   }
  // };

  // const handleBack = () => {
  //   setShowOtpVerification(false);
  // };

  // if (showOtpVerification) {
  //   return (
  //     <OtpVerification
  //       phoneNumber={phoneNumber}
  //       onVerify={handleOtpVerify}
  //       onBack={handleBack}
  //     />
  //   );
  // }

  return (
    <div>
      {step === "phone" && (
        <form onSubmit={handleSendOtp} className="space-y-12">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-center lg:text-left justify-center">
              Login or Sign up
            </h1>
            <p className="text-gray-500 text-center lg:text-left">
              Let the magic begin
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Mobile number *</Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your mobile number"
                required
                className="flex-grow"
              />
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={agree}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor="terms" className="text-sm leading-none">
              I agree to all the{" "}
              <Link href="/terms" className="text-blue-600 hover:text-blue-500">
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-500"
              >
                Privacy policy
              </Link>
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={!agree || !phone}>
            Login
          </Button>
          {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
        </form>
      )}
      {step === "otp" && (
        <OtpVerification
          phoneNumber={""}
          onVerify={handleVerifyOtp}
          onBack={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
    </div>
  );
}
