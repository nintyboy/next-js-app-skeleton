import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import ReactGA from 'react-ga4';

import Loader from '@/components/loader/Loader';
import AuthContext from '@/context/AuthContext';
import { connectStripe, postStripe } from '@/utils/stripe';

const StripeButton = () => {
  const user = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    ReactGA.event({
      category: 'Stripe',
      action: 'Buy now click',
    });
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
    <button
      onClick={checkOut}
      className="
        flex
        flex-row
        items-center
        justify-center
        gap-4
        rounded-3xl
        bg-[#F7BE38]
        py-4
        px-6
        text-lg
        font-extrabold
        text-gray-900
        outline-none
        ring-4
        ring-[#F7BE38]/50
        hover:bg-[#F7BE38]/90"
    >
      <Loader classNames="h-6 w-6 fill-gray-900" visible={isLoading} />
      Buy now for $24.99
    </button>
  );
};

export default StripeButton;
