import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});
const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const params: Stripe.Checkout.SessionCreateParams = {
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer: req.body.stripeId,
      mode: 'payment',
      success_url: `${req.headers.origin}`,
      cancel_url: `${req.headers.origin}`,
    };

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);

    res.status(200).json(checkoutSession);
  } catch (error) {
    const errorMessage = 'Internal server error';
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
}
