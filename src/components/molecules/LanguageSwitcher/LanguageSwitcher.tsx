'use client';

import Cookies from 'js-cookie';
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
    Cookies.set('locale', nextLang, {
      expires: 365,
    });
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
