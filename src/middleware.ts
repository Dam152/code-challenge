import type { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

const locales = ["it", "en"];

function getLocale(_request: NextURL) {
  return locales[0];
}

export function middleware(request: { nextUrl: NextURL | URL }) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request.nextUrl as NextURL);

  (request.nextUrl as NextURL).pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|icons|favicon.ico).*)"],
};
