'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    params?.set('page', page.toString());
    router.push(`/?${params.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).slice(
    Math.max(0, currentPage - 2),
    Math.min(currentPage + 1, totalPages)
  );

  return (
    <div className="flex justify-center items-center space-x-2 mt-4 pb-24">
      <button
        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300  dark:bg-black dark:text-white"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`px-2 py-1 rounded ${
            page === currentPage
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300 dark:bg-black dark:text-white'
          }`}
          onClick={() => goToPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 dark:bg-black dark:text-white"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
