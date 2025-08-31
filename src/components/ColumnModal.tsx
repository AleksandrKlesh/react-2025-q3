import React from 'react';

interface Props {
  availableColumns: string[];
  selected: string[];
  onToggle: (col: string) => void;
  onClose: () => void;
}

function ColumnModal({ availableColumns, selected, onToggle, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-xl w-96">
        <h3 className="text-lg font-bold mb-2">Select Columns</h3>
        <div className="max-h-64 overflow-y-auto">
          {availableColumns.map((col) => (
            <label key={col} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selected.includes(col)}
                onChange={() => onToggle(col)}
              />
              {col}
            </label>
          ))}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

const columnModalMemo = React.memo(ColumnModal);

export { columnModalMemo as ColumnModal };
