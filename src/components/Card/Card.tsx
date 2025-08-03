import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelectedItemsStore } from '../../hooks/useSelectedItemsStore';

interface Props {
  id: number;
  name: string;
  species: string;
  gender: string;
  image: string;
}

export default function Card({ id, name, species, gender, image }: Props) {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const navigate = useNavigate();
  const { selectedItems, toggleItem } = useSelectedItemsStore();
  const isSelectedItem = !!selectedItems[id];

  const handleCardClick = () => {
    navigate(`/?page=${page}&details=${id}`);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md p-4 mb-4 flex gap-4 items-center cursor-pointer dark:bg-black"
      onClick={handleCardClick}
    >
      <img
        className="w-24 h-24 rounded-full object-cover border border-gray-300"
        src={image}
        alt={name}
      />
      <div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {name}
        </h2>
        <p className="text-sm text-gray-600 dark:text-white">{species}</p>
        <p className="text-sm text-gray-600 dark:text-white">{gender}</p>
      </div>
      <input
        className="ml-auto w-8 h-8"
        type="checkbox"
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          e.stopPropagation();
          toggleItem({ id, name, species, gender, image });
        }}
        checked={isSelectedItem}
      />
    </div>
  );
}
