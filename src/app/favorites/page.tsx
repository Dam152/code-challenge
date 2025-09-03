import { PageHeader } from '@/components/molecules/PageHeader';
import { FavoriteTemplate } from '@/components/tempate/FavoriteTemplate';

export default function page() {
  return (
    <div className="w-full grid gap-[19px]">
      <PageHeader
        text={'favorites'}
        labelLink={'back'}
        href={'/'}
        icon="prev"
      />
      <FavoriteTemplate />
    </div>
  );
}
