import { Text } from '@/components/atoms/Text';
import Link from 'next/link';

type PageHeaderProps = {
  text: string;
  labelLink: string;
  href: string;
  icon?: 'prev' | 'next';
};

export function PageHeader({
  text,
  labelLink,
  href,
  icon = 'next',
}: PageHeaderProps) {
  return (
    <div className="w-full gap-[16px] flex max-[322px]:gap-[8px] flex-wrap justify-between items-center">
      <Text as="h1" className="display-large">
        {text}
      </Text>
      <Link href={href} className="primary-link">
        {icon === 'prev' && <span className="ml-2">←</span>}
        {labelLink}
        {icon === 'next' && <span className="mr-2">→</span>}
      </Link>
    </div>
  );
}
