'use client';

import '@/styles/landing.css';

import { LoginIcon } from '@heroicons/react/solid';
import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import Link from 'next/link';
import React from 'react';
import { TypeAnimation } from 'react-type-animation';

import DownloadButton from '@/components/buttons/DownloadButton';
import StripeButton from '@/components/buttons/StripeButton';
import LandingHeader from '@/components/header/LandingHeader';
import FirebaseSVG from '@/components/icons/FirebaseSVG';
import NextSVG from '@/components/icons/NextSVG';
import AuthContext from '@/context/AuthContext';

type LandingProps = {
  user: DecodedIdToken | null;
};

const Landing = ({ user }: LandingProps) => {
  return (
    <AuthContext.Provider value={user}>
      <div className="flex flex-col">
        <LandingHeader />
        <div className="flex flex-col items-center justify-center gap-8 p-10">
          <div
            className="
            flex
            flex-col
            items-center
            whitespace-nowrap
            text-5xl
            font-extrabold
            text-black
            sm:flex-row
            md:text-6xl"
          >
            <NextSVG className="h-10 md:h-16">Next.js 13</NextSVG>
            {' + '}
            <FirebaseSVG className="h-10 md:h-16">Firebase</FirebaseSVG>
          </div>
          <div
            className="
            text-3xl
            font-normal
            text-black
            lg:text-4xl"
          >
            Start your next{' '}
            <TypeAnimation
              className="type block font-extrabold sm:inline"
              sequence={[
                'Ecommerce',
                3000,
                'Educational',
                3000,
                'AI/ML',
                3000,
                'Blockchain',
                3000,
                'Scientific 🔭',
                4000,
                'Portfolio',
                3000,
              ]}
              cursor={false}
              omitDeletionAnimation={true}
              wrapper="span"
              repeat={Infinity}
            />
            <p>
              project in a <span className="underline">minutes</span> not weeks.
            </p>
          </div>
        </div>
        {user &&
          (user.subscriber ? (
            <div className="flex flex-col items-center justify-start gap-4 p-10">
              <DownloadButton />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-start gap-4 p-10">
              <StripeButton />
              <p className="px-5 text-center text-xs text-black">
                A perpetual subscription. Next.js 13 is still in beta, so stay
                tuned!
              </p>
            </div>
          ))}
        <div className="flex flex-col items-center justify-center gap-8 p-10">
          <h1
            className="flex
            flex-col
            items-center
            whitespace-nowrap
            text-4xl
            font-extrabold
            text-black
            sm:flex-row
            md:text-5xl"
          >
            {`What's included:`}
          </h1>
          <div className="flex flex-col gap-4">
            <div className="text-md text-black">
              ✔️ Next.js 13 — starter package with project structure,
              configuration and SSR.
            </div>
            <div className="text-md text-black">
              ✔️ SEO-friendly React + Typescript full-stack site with
              minimalistic design.
            </div>
            <div className="text-md text-black">
              ✔️ Firebase Authentication workflows with public and protected
              pages.
            </div>
            <div className="text-md text-black">
              ✔️ Serverless API with Cloud functions.
            </div>
            <div className="text-md text-black">
              ✔️ Firebase Firestore database integration.
            </div>
            <div className="text-md text-black">
              ✔️ Firebase Storage access with custom claims.
            </div>
            <div className="text-md text-black">✔️ TailwindCSS.</div>
            <div className="text-md inline text-black">
              ✔️{' '}
              <Link
                href="https://vercel.com"
                target="_blank"
                className="mx-1 underline"
              >
                Vercel.com
              </Link>{' '}
              cloud deployment ready.
            </div>
            <div className="text-md inline text-black">
              ✔️{' '}
              <Link
                href="https://stripe.com"
                target="_blank"
                className="mx-1 underline"
              >
                Stripe.com
              </Link>{' '}
              payments integration.
            </div>
            <div className="text-md text-black">✔️ Google Analytics.</div>
            <div className="text-md text-black">
              ✔️ Setup instructions and this site codebase.
            </div>
            <div className="text-md text-black">
              ✔️ For personal and commercial project or simply for learning.
            </div>
          </div>
          {!user && (
            <div className="flex flex-col items-center gap-4 pt-10 text-sm md:flex-row">
              <Link href="/sign-up" prefetch={false}>
                <div
                  className="
                  flex
                  flex-row
                  items-center
                  justify-center
                  gap-2
                  rounded-3xl
                  bg-[#F7BE38]
                  py-2
                  px-4
                  text-lg
                  font-extrabold
                  text-black
                  outline-none
                  ring-4
                  ring-[#F7BE38]/50
                  hover:bg-[#F7BE38]/90"
                >
                  Sign up
                  <LoginIcon className="h-5" />
                </div>
              </Link>
              To explore the documentation and purchase the package.
            </div>
          )}
          <div className="flex flex-col gap-4 pt-20 text-center text-sm text-neutral-400">
            <div className="flex flex-row gap-6">
              <p>
                Email: <span className="underline">hello.nextjs@gmail.com</span>
              </p>
            </div>
            <p>Copyright © {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </AuthContext.Provider>
  );
};

export default Landing;
