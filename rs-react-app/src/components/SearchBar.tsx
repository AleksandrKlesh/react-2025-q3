import React from 'react';

interface Props {
  onSearch: (query: string) => void;
  initialValue: string;
}

interface State {
  input: string;
}

export default class SearchBar extends React.Component<Props, State> {
  state: State = { input: this.props.initialValue || '' };

  handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
  };

  handleSearch = () => {
    const trimmed = this.state.input.trim();
    this.props.onSearch(trimmed);
    localStorage.setItem('searchQuery', trimmed);
  };

  render() {
    return (
      <div className="search-bar-wrapper">
        <input
          className="search-input"
          type="text"
          value={this.state.input}
          onChange={this.handleInput}
        />
        <button className="search-button" onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}
