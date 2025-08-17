import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/navigation';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';

export default function Header() {
  const t = useTranslations();
  return (
    <div className="flex flex-col">
      <nav className="flex p-4 gap-4 items-center justify-center">
        <Link href={'/'} className="text-blue-600 hover:underline">
          {t('Header.home')}
        </Link>
        <Link href={'/about'} className="text-blue-600 hover:underline">
          {t('Header.about')}
        </Link>
      </nav>
      <LanguageSwitcher />
      <ThemeSwitcher />
    </div>
  );
}
