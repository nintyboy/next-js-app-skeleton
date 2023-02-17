import { redirect } from 'next/navigation';
import React from 'react';

import { userSession } from '@/firebase/serverUserSessionUtils';
import { type PageProps } from '@/utils/getCategories';

export default async function Layout({ children }: PageProps) {
  const userData = await userSession();
  if (!userData) {
    redirect('/sign-in');
  }
  return <div className="flex flex-col">{children}</div>;
}
