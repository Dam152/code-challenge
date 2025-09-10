import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/app/dictionaries";
import { PageHeader } from "@/components/molecules/PageHeader";
import { SearchTemplate } from "@/components/tempate/SearchTemplate";

type Params = {
  params: Promise<{
    lang: Locale;
  }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;

  const dict = (await getDictionary(lang)).search;

  return {
    title: `${process.env.NEXT_APP_NAME} | ${dict.seo.metaTitle}`,
    description: dict.seo.metaDescription,
  };
}

export default async function page({ params }: Params) {
  const { lang } = await params;
  const dict = (await getDictionary(lang)).search;
  return (
    <div className="w-full grid gap-[19px]">
      <PageHeader
        text={dict.title}
        labelLink={dict.buttonLabel}
        href={"/"}
        icon="prev"
      />
      <SearchTemplate
        responseNotFound={dict.responseNotFound}
        placeholder={dict.placeholder}
      />
    </div>
  );
}
