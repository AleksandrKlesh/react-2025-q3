import React from 'react';
import Card from './Card';
import type { Character } from '../api/fetchData';

interface Props {
  loading: boolean;
  error: string | null;
  data: Character[];
}

export default class Results extends React.Component<Props> {
  render() {
    const { loading, error, data } = this.props;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!data.length) return <div>No results found.</div>;

    return (
      <div>
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
