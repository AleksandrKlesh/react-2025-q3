import { useTranslations } from 'next-intl';
import { Link } from '../i18n/navigation';

function About() {
  const t = useTranslations();
  return (
    <div className="min-h-screen flex flex-col items-center p-4 dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold mb-2">{t('About.title')}</h1>
      <h2 className="text-xl font-bold mb-2">{t('About.developed')}</h2>
      <p className="mb-4">{t('About.description')}</p>
      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-blue-600 hover:underline"
      >
        RS-School React Course
      </a>
      <Link href="/" className="text-blue-600 hover:underline">
        {t('About.back')}
      </Link>
    </div>
  );
}

export default About;
