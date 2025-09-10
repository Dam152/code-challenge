'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import type { Locale } from '@/app/dictionaries';

export function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const currentLang = params.lang as Locale;

  const nextLang: Locale = currentLang === 'it' ? 'en' : 'it';
  const newPath = pathname.replace(`/${currentLang}`, `/${nextLang}`);

  const handleLanguageChange = () => {
    document.cookie = `locale=${nextLang}; path=/; max-age=31536000`;
  };

  return (
    <Link
      href={newPath}
      className="body-small hover:opacity-70 transition-opacity"
      onClick={handleLanguageChange}
    >
      {nextLang.toUpperCase()}
    </Link>
  );
}
