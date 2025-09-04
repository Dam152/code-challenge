import Skeleton from "react-loading-skeleton";

export function CardMovieSkeleton() {
  return (
    <Skeleton
      height={87}
      width={"100%"}
      className="w-full h-[87px]"
      borderRadius={3}
      baseColor="#f3f4f6"
      highlightColor="#e5e7eb"
    />
  );
}
