import React from 'react';
import Card from '../Card/Card';
import type { Character } from '../../api/fetchData';

interface Props {
  loading: boolean;
  error: string | null;
  data: Character[];
}

export default class Results extends React.Component<Props> {
  render() {
    const { loading, error, data } = this.props;

    if (loading) return <div className="p-4 text-blue-500">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;
    if (!data.length)
      return <div className="p-4 text-gray-600">No results found.</div>;

    return (
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <Card
            key={item.id}
            name={item.name}
            gender={item.gender}
            species={item.species}
            image={item.image}
          />
        ))}
      </div>
    );
  }
}
