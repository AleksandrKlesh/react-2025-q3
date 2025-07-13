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
      <div>
        <h2 className="card-name">{this.props.name}</h2>
        <p className="card-species">{this.props.species}</p>
        <p className="card-gender">{this.props.gender}</p>
        <img className="card-image" src={this.props.image} alt="Character" />
      </div>
    );
  }
}
