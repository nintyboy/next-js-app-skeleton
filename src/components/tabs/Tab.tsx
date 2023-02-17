import Link from 'next/link';

import type { Item } from '@/components/tabs/TabGroup';

export const Tab = ({
  path,
  item: { slug, text },
}: {
  path: string;
  item: Item;
}) => {
  const href = slug ? `${path}/${slug}` : path;

  return (
    <Link className="w-fit" href={href} replace={true}>
      {text}
    </Link>
  );
};
