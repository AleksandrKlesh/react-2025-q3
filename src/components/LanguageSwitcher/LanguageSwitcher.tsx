'use client';

import { usePathname, useRouter, useParams } from 'next/navigation';

export function LanguageSwitcher() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const currentLocale = params?.locale || 'en';
  const nextLocale = currentLocale === 'en' ? 'ru' : 'en';

  const toggleLocale = () => {
    if (pathname) {
      const segments = pathname.split('/').filter(Boolean);
      segments[0] = nextLocale;
      const newPath = '/' + segments.join('/');
      router.push(newPath + window.location.search);
    }
  };

  return (
    <button
      onClick={toggleLocale}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mx-auto rounded cursor-pointer"
    >
      {nextLocale.toUpperCase()}
    </button>
  );
}
