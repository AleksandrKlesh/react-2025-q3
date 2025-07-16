import React from 'react';

interface Props {
  name: string;
  species: string;
  gender: string;
  image: string;
}

export default class Card extends React.Component<Props> {
  render() {
    return (
      <div className="bg-white rounded-xl shadow-md p-4 mb-4 flex gap-4 items-center">
        <img
          className="w-24 h-24 rounded-full object-cover border border-gray-300"
          src={this.props.image}
          alt="Character"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-800">{this.props.name}</h2>
          <p className="text-sm text-gray-600">{this.props.species}</p>
          <p className="text-sm text-gray-600">{this.props.gender}</p>
        </div>
      </div>
    );
  }
}
