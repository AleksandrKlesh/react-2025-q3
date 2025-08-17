'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import App from '../components/App/App';
import Header from '../components/Header/Header';
import Details from '../components/Details/Details';
import { Character, Info } from '../types';

type MainPageProps = {
  initialData: {
    results: Character[];
    info: Info;
  };
};

export default function MainPage({ initialData }: MainPageProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const details = searchParams?.get('details');
  const page = searchParams?.get('page') || '1';

  const handleMainClick = () => {
    if (details) {
      router.push(`/?page=${page}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Header />
      <div className="flex">
        <div className="flex-1" onClick={handleMainClick}>
          <App initialData={initialData} />
        </div>
        {details && (
          <div className="w-[40%] max-w-md bg-white">
            <Details />
          </div>
        )}
      </div>
    </div>
  );
}
