import '@/styles/global.css';

import { redirect } from 'next/navigation';

import Docs from '@/components/Docs';
import { TabGroup } from '@/components/tabs/TabGroup';
import { userSession } from '@/firebase/serverUserSessionUtils';
import type { Category } from '@/utils/getCategories';
import { fetchCategories } from '@/utils/getCategories';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await userSession();

  if (!userData) {
    redirect('/sign-in');
  }
  const categories = await fetchCategories();
  return (
    <Docs user={userData}>
      <TabGroup
        path="/docs"
        items={[
          {
            text: 'Getting started',
          },
          ...categories.map((category: Category) => ({
            text: category.name,
            slug: category.slug,
          })),
        ]}
      />
      {children}
    </Docs>
  );
}
