'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSignIn } from '@clerk/nextjs';

interface OtpVerificationProps {
  phoneNumber: string;
  onVerify: (e: React.FormEvent, otp: string) => void;
  onBack: () => void;
}

export function OtpVerification({ phoneNumber, onVerify, onBack }: OtpVerificationProps) {
  const { signIn, isLoaded } = useSignIn();
  const [otpCode, setOtpCode] = useState<Array<string>>(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const inputRefs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));

  const [timeLeft, setTimeLeft] = useState(300); // 300 seconds = 5 minutes

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);
  
  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Allow only numeric input

    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    if (value && index < otpCode.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleResend = async () => {
    if (!isLoaded) return;

    try {
      await signIn.create({
        identifier: phoneNumber,
        strategy: 'phone_code',
      });
      setError('OTP resent successfully.');
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    }
  };
  
  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Verify with OTP</h1>
        <p className="text-gray-500">Sent to {phoneNumber}</p>
      </div>

      <form onSubmit={(e) => onVerify(e, otpCode.join(''))} className="space-y-6 w-full max-w-xs">
        <div className="flex justify-between gap-2">
          {otpCode.map((digit, index) => (
            <Input
              key={index}
              ref={inputRefs[index]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          ))}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button
          type="button"
          variant="ghost"
          className="w-full text-pink-500 hover:text-pink-600 hover:bg-pink-50"
          onClick={handleResend}
        >
          Resend OTP
        </Button>

        <Button type="submit" className="w-full bg-pink-500 text-white hover:bg-pink-600">
          Verify OTP
        </Button>

        <div className="space-y-4 text-center">
          <div className="text-sm text-gray-600">
            Having trouble logging in?{' '}
            <Link href="/help" className="text-pink-500 hover:text-pink-600">
              Get help
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
