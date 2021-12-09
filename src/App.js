import { Component } from 'react';
import PropTypes from 'prop-types';

import './App.css';

import Searchbar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
// import Loader
import Button from './components/Button';
import ButtonClose from './components/Modal/ButtonClose';
import Modal from './components/Modal';
import fetchImages from './services/apiService';

import { ReactComponent as IconButtonClose } from './images/icon-close.svg';

const INITIAL_STATE = {
  isLoading: false,
  images: [],
  page: 1,
  showModal: false,
  isDownlImages: false,
  currImg: {},
};

class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  static propTypes = {
    images: PropTypes.array,
    page: PropTypes.number,
    showModal: PropTypes.bool,
    isDownlImages: PropTypes.bool,
    currImg: PropTypes.object,
  };

  reset = () => {
    this.setState({
      ...INITIAL_STATE,
    });
  };

  toggleModal = img => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      currImg: img,
    }));
  };

  isisDownlImages = () => {
    this.setState(({ images }) => ({
      isDownlImages: images.length > 0,
    }));
  };

  handleGetImages = ({ searchText }) => {
    const data = fetchImages(searchText, this.state.page, 12, null);
    data.then(response => {
      this.setState({
        images: [...this.state.images, ...response],
        page: 1,
      });
    });
  };

  handleClick = event => {
    const img = this.state.images.filter(
      item => item.id === Number(event.target.attributes.id.nodeValue),
    );
    img.length > 0 && this.toggleModal(img[0]);
  };

  render() {
    const { showModal, isDownlImages, currImg } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleGetImages} />

        {isDownlImages && <ImageGallery imageList={this.state.images} onClick={this.handleClick} />}
        {isDownlImages && <Button onClick={this.handleGetImages} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <ButtonClose onClick={this.toggleModal} aria-label="Close modal window">
              <IconButtonClose fill="black" />
            </ButtonClose>
            <img src={currImg.largeImageURL} alt={currImg.tags} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
