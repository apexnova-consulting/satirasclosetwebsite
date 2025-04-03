import { Suspense } from 'react';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <CheckoutForm />
        </Suspense>
      </div>
    </div>
  );
} 