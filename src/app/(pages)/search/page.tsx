import type { Metadata } from 'next';
import { PageHeader } from '@/components/molecules/PageHeader';
import { SearchTemplate } from '@/components/tempate/SearchTemplate';

export const metadata: Metadata = {
  title: `${process.env.NEXT_APP_NAME} | Search`,
  description: 'search your favorite gifs',
};

export default function page() {
  return (
    <div className="w-full grid gap-[19px]">
      <PageHeader text={'Search'} labelLink={'back'} href={'/'} icon="prev" />
      <SearchTemplate />
    </div>
  );
}
