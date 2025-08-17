import MainPage from '../../pages/MainPage';
import { fetchData } from '../../services/fetchData';
import { Character, Info } from '../../types';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ru' }];
}

export default async function MainRouterPage() {
  const currentPage = 1;
  const data: { results: Character[]; info: Info } = await fetchData(
    '',
    currentPage
  );
  return (
    <div>
      <MainPage initialData={data} />
    </div>
  );
}
