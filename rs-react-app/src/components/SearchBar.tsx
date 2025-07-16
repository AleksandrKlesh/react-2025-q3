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
      <div className="flex items-center gap-2 p-4 bg-gray-100 shadow-sm">
        <input
          className="flex-grow p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          value={this.state.input}
          onChange={this.handleInput}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={this.handleSearch}
        >
          Search
        </button>
      </div>
    );
  }
}
