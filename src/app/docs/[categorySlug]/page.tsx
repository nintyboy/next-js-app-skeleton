'use client';

import CloudFunctionsDemo from '@/components/demo/CloudFunctionsDemo';
import StripeButtonDemo from '@/components/demo/StripeButtonDemo';
import DeployToVercel from '@/lib/docs/deploy_to_production.md';
import Firebase from '@/lib/docs/firebase_setup.md';
import Storage from '@/lib/docs/firebase_storage.md';
import type { PageProps } from '@/utils/getCategories';

export default function Page({ params }: PageProps) {
  return (
    <div className="flex flex-col justify-center px-6 pb-10 text-sm">
      {params.categorySlug === 'firebase' && <Firebase />}
      {params.categorySlug === 'deploy' && <DeployToVercel />}
      {params.categorySlug === 'serverless' && <CloudFunctionsDemo />}
      {params.categorySlug === 'stripe' && <StripeButtonDemo />}
      {params.categorySlug === 'storage' && <Storage />}
    </div>
  );
}
