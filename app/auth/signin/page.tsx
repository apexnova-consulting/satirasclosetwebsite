"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Suspense } from 'react';
import { SignInForm } from '@/components/auth/SignInForm';
import { Metadata } from 'next';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export const metadata: Metadata = {
  title: 'Sign In - Satira\'s Closet',
  description: 'Sign in to your account',
};

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Suspense fallback={<div className="text-center">Loading...</div>}>
            <SignInForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
} 