'use client';

import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import React, { useContext, useState } from 'react';

import StripeSVG from '@/components/icons/StripeSVG';
import Loader from '@/components/loader/Loader';
import AuthContext from '@/context/AuthContext';
import Stripe from '@/lib/docs/stripe_integration.md';
import { connectStripe, postStripe } from '@/utils/stripe';

const StripeButtonDemo = () => {
  const user = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const success = searchParams.get('success');
  const { uid } = user!;

  const checkOut = async () => {
    setIsLoading(true);
    const firestore = getFirestore();
    const q = doc(firestore, 'customers', uid);
    const querySnapshot = await getDoc(q);
    const customer = querySnapshot.data();

    const response = await postStripe(
      '/api/checkout_session',
      customer?.stripeId as string,
    );
    if (response.statusCode === 500) {
      setIsLoading(false);
      return;
    }

    const stripe = await connectStripe();
    await stripe?.redirectToCheckout({
      sessionId: response.id,
    });
    setIsLoading(false);
  };

  return (
    <div>
      <Stripe />
      <div
        className="
        pointer-events-none flex
        w-full
        flex-col
        items-center
        justify-center
        gap-2
        rounded-2xl
        border
        p-10
        text-center
        opacity-50"
      >
        {success === 'true' && (
          <CheckCircleIcon className="h-8 text-green-700" />
        )}
        {success === 'false' && <XCircleIcon className="h-8 text-red-700" />}
        {!success && (
          <button
            onClick={async () => checkOut()}
            className="
              flex
              w-fit
              flex-row
              items-center
              justify-center
              rounded-md
              border
              bg-[#F7BE38]
              px-3
              py-1.5
              text-sm
              font-semibold
              text-black"
          >
            <Loader classNames="h-4 w-4 fill-black" visible={isLoading} />
            <StripeSVG className="h-4" />
          </button>
        )}
        <p className="text-sm">
          Use <b>4242 4242 4242 4242</b> as credit card number
          <br />
          with any expiration date and cvc code.
        </p>
      </div>
    </div>
  );
};

export default StripeButtonDemo;
