import { Suspense } from 'react';
import { createDataResource } from './services/dataLoader';
import CountryList from './components/CountryList';
import type { Co2Dataset } from './types/types';
import { Spinner } from './components/Spinner';

const resource = createDataResource<Co2Dataset>('/owid-co2-data.json');

export default function App() {
  return (
    <div className="p-6">
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold mb-4">CO₂ Emissions</h1>
      </div>
      <Suspense
        fallback={
          <div className="">
            <Spinner />
          </div>
        }
      >
        <CountryList resource={resource} />
      </Suspense>
    </div>
  );
}
