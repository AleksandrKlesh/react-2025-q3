interface Props {
  name: string;
  species: string;
  gender: string;
  image: string;
}

export default function Card({ name, species, gender, image }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-4 flex gap-4 items-center">
      <img
        className="w-24 h-24 rounded-full object-cover border border-gray-300"
        src={image}
        alt={name}
      />
      <div>
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-600">{species}</p>
        <p className="text-sm text-gray-600">{gender}</p>
      </div>
    </div>
  );
}
