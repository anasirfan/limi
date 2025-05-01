'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

// This component handles the redirect
function BallSystemRedirect() {
  const router = useRouter();

  useEffect(() => {
    // The destination can be changed here without updating the QR code
    // Currently pointing to the Ball System Standard product
    router.push('/product-catalog/ball-system-standard');
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#292929] text-white p-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold font-[Amenti] text-[#54BB74] mb-4">
          Redirecting to Ball System
        </h1>
        <p className="mb-6">
          You will be redirected to the Ball System page automatically. 
          If you are not redirected, please click the button below.
        </p>
        <button 
          onClick={() => router.push('/product-catalog/ball-system-standard')}
          className="bg-[#292929] border border-[#54BB74] text-[#54BB74] px-6 py-3 rounded-md hover:bg-[#54BB74] hover:text-white transition-colors"
        >
          Go to Ball System
        </button>
      </div>
    </div>
  );
}

// Main component wrapped with Suspense for loading state
export default function BallSystemRedirectPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-[#292929] text-white">
        <div className="animate-pulse text-2xl text-[#54BB74]">Loading...</div>
      </div>
    }>
      <BallSystemRedirect />
    </Suspense>
  );
}
