import { Component } from 'react';
import PropTypes from 'prop-types';

import './App.css';

import Searchbar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
// import Loader
// import Button from './components/Button';
// import Modal
import fetchImages from './helpers/apiService';

const INITIAL_STATE = {
  images: [],
  page: 1,
};

class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  static propTypes = {
    images: PropTypes.array,
    page: PropTypes.number,
  };

  reset = () => {
    this.setState({
      ...INITIAL_STATE,
    });
  };

  handleGetImages = ({ searchText }) => {
    const data = fetchImages(searchText, this.state.page, 12, null);
    data.then(
      response => {
            this.setState({
              images: [...this.state.images, ...response.],
              page: 1,
            });
      }
    );
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleGetImages} />
        <ImageGallery imageList={this.state.images} />
        {/*<Button /> */}
      </div>
    );
  }
}

export default App;
