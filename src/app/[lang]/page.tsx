import { notFound } from "next/navigation";
import { CardMovie } from "@/components/molecules/CardMovie";
import { PageHeader } from "@/components/molecules/PageHeader";
import { Pagination } from "@/components/molecules/Pagination/Pagination";
import { getCharacters } from "@/lib/actions/characters";
import type { Character } from "@/types/generated";
import { getDictionary, type Locale } from "../dictionaries";

export default async function Home({
  params,
  searchParams,
}: {
  params: Promise<{
    lang: Locale;
  }>;

  searchParams: Promise<{
    page?: string;
  }>;
}) {
  const searchParamsResolved = await searchParams;
  const { lang } = await params;
  const currentPage = Number(searchParamsResolved.page) || 1;
  const data = await getCharacters(currentPage);

  if (!data) {
    notFound();
  }

  if (
    searchParamsResolved.page &&
    (Number.isNaN(currentPage) ||
      currentPage < 1 ||
      currentPage > (data.characters?.info?.pages || 1))
  ) {
    notFound();
  }

  const dictionary = await getDictionary(lang);
  const homepage = dictionary.homepage;
  return (
    <div className="w-full grid gap-[19px]">
      <PageHeader
        text={homepage.title}
        labelLink={homepage.buttonLabel}
        href={"/favorites"}
        icon="next"
      />

      <div className="grid min-[1440px]:grid-cols-3 gap-[13px]">
        {data?.characters?.results?.map((character) => (
          <CardMovie key={character?.id} card={character as Character} />
        ))}
      </div>

      <Pagination data={data} currentPage={currentPage} />
    </div>
  );
}
