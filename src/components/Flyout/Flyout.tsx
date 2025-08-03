import { useSelectedItemsStore } from '../../hooks/useSelectedItemsStore';
import downloadCsv from '../../utils/downloadCSV';

export default function Flyout() {
  const { selectedItems, clearItems } = useSelectedItemsStore();

  const itemsArray = Object.values(selectedItems);
  const count = itemsArray.length;

  if (count === 0) return;

  const handleDownload = () => {
    downloadCsv(Object.values(selectedItems));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white text-black dark:bg-gray-900  dark:text-white p-4 flex justify-between items-center shadow-md z-10">
      <p className="text-sm font-medium">
        {count} item{count > 1 ? 's' : ''} selected
      </p>
      <div className="flex gap-4">
        <button
          onClick={clearItems}
          className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded"
        >
          Unselect all
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download
        </button>
      </div>
    </div>
  );
}
