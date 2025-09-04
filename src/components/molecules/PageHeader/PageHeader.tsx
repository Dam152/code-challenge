import Link from "next/link";
import { IoMdSearch } from "react-icons/io";
import { Text } from "@/components/atoms/Text";

type PageHeaderProps = {
  text: string;
  labelLink: string;
  href: string;
  icon?: "prev" | "next";
};

export function PageHeader({
  text,
  labelLink,
  href,
  icon = "next",
}: PageHeaderProps) {
  return (
    <div className="w-full gap-[16px] flex max-[322px]:gap-[8px] flex-wrap justify-between items-center">
      <Text as="h1" className="display-large">
        {text}
      </Text>
      <div className="flex gap-4 items-center max-[350px]:justify-between max-[350px]:w-full">
        <Link href={"/search"}>
          <IoMdSearch className="w-[18px] h-[18px]" />
        </Link>
        <Link href={href} className="primary-link">
          {icon === "prev" && <span className="ml-2">←</span>}
          {labelLink}
          {icon === "next" && <span className="mr-2">→</span>}
        </Link>
      </div>
    </div>
  );
}
