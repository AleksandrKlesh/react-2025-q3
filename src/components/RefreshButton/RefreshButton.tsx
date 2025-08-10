interface Props {
  onRefresh: () => void;
}

export function RefreshButton({ onRefresh }: Props) {
  return (
    <div className="flex justify-center">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mx-auto rounded cursor-pointer"
        onClick={onRefresh}
      >
        Refresh
      </button>
    </div>
  );
}
