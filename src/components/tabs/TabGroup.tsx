import { Tab } from '@/components/tabs/Tab';

export type Item = {
  text?: string;
  slug?: string;
};

export const TabGroup = ({ path, items }: { path: string; items?: Item[] }) => {
  return (
    <div className="flex flex-col gap-2 px-6 py-10 text-sm">
      {items?.map((item) => (
        <Tab key={path + item.slug} item={item} path={path} />
      ))}
    </div>
  );
};
