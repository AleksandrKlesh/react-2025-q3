import React from 'react';
import { fetchData, type Character } from '../../api/fetchData';
import SearchBar from '../SearchBar/SearchBar';
import Results from '../Results/Results';

interface State {
  loading: boolean;
  error: string | null;
  data: Character[];
  searchQuery: string;
  crash: boolean;
}

class App extends React.Component<object, State> {
  state: State = {
    loading: false,
    error: null,
    data: [],
    searchQuery: localStorage.getItem('searchQuery') || '',
    crash: false,
  };

  componentDidMount(): void {
    this.loadData(this.state.searchQuery);
  }

  loadData = (query: string) => {
    this.setState({ loading: true, error: null });

    fetchData(query)
      .then((results) => this.setState({ data: results, loading: false }))
      .catch((err) => this.setState({ error: err, loading: false }));
  };

  handleSearch = (query: string) => {
    this.setState({ searchQuery: query });
    this.loadData(query);
  };

  throwError = () => {
    this.setState({ crash: true });
  };

  render() {
    if (this.state.crash) {
      throw new Error('Simulated error for ErrorBoundary');
    }
    return (
      <div className="min-h-screen bg-gray-50">
        <SearchBar
          onSearch={this.handleSearch}
          initialValue={this.state.searchQuery}
        />
        <div className="p-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={this.throwError}
          >
            Throw Error
          </button>
        </div>
        <Results
          loading={this.state.loading}
          error={this.state.error}
          data={this.state.data}
        />
      </div>
    );
  }
}

export default App;
