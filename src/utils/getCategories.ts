import { cache } from 'react';

export type PageProps = {
  params?: any;
  children?: React.ReactNode;
};

export type Category = {
  name: string;
  slug: string;
};

export const getCategories = cache((): Category[] => [
  {
    name: 'Firebase setup',
    slug: 'firebase',
  },
  {
    name: 'Cloud functions',
    slug: 'serverless',
  },
  {
    name: 'Stripe integration',
    slug: 'stripe',
  },
  {
    name: 'Storage access for subscribers',
    slug: 'storage',
  },
  {
    name: 'Deploy to production',
    slug: 'deploy',
  },
]);

export async function fetchCategoryBySlug(slug: string | undefined) {
  return getCategories().find((category) => category.slug === slug);
}

export async function fetchCategories(): Promise<Category[]> {
  return getCategories();
}
