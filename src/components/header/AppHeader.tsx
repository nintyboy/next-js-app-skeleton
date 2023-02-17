'use client';

import { LogoutIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

import UserPicSVG from '@/components/icons/UserPicSVG';
import AuthContext from '@/context/AuthContext';
import { clientAuth } from '@/firebase/clientFirebaseApps';
import { signOut } from '@/firebase/clientUserSessionUtils';

const AppHeader = () => {
  const user = useContext(AuthContext);
  const router = useRouter();

  const logout = async () => {
    await signOut(clientAuth);
    await router.replace('/');
  };

  return (
    <header className="flex h-16 w-full items-center justify-end py-2 px-6">
      <div className="flex flex-row items-center gap-2">
        <Link href="/" prefetch={false} replace={true}>
          <div
            className="
              cursor-pointer
              rounded-md
              bg-gray-900
              px-2
              py-1.5
              text-sm
              font-semibold
              text-white"
          >
            Go to landing
          </div>
        </Link>
        <div
          className="
            flex
            cursor-pointer
            flex-row
            justify-center
            gap-1
            p-2
            text-sm
            font-semibold"
          onClick={logout}
        >
          <span>Sign out</span>
          <LogoutIcon className="h-5" />
        </div>
        <div className="align-center flex flex-col justify-center">
          {user?.picture ? (
            <img
              className="block h-9 w-9 rounded-3xl"
              src={user?.picture}
              alt={user?.name}
            />
          ) : (
            <UserPicSVG className="h-9" />
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
