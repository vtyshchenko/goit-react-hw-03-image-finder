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
  page: 0,
  showModal: false,
  isDownlImages: false,
  currImg: 0,
  findText: '',
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
    currImg: PropTypes.number,
  };

  reset = () => {
    this.setState({
      ...INITIAL_STATE,
    });
  };

  toggleModal = img => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleGetImages = ({ searchText }) => {
    if (!searchText) {
      searchText = this.state.findText;
    } else {
      this.setState({
        images: [],
        page: 0,
      });
    }
    const data = fetchImages(searchText, this.state.page + 1, 12, null);
    data.then(response => {
      this.setState(state => ({
        images: [...state.images, ...response],
        page: state.page + 1,
        isDownlImages: response.length > 0,
        findText: searchText,
      }));
    });
  };

  handleClick = event => {
    const { images } = this.state;
    const img = images.filter(item => item.id === Number(event.target.attributes.id.nodeValue));

    this.setState({
      currImg: images.indexOf(img[0]),
    });
    img.length > 0 && this.toggleModal(img[0]);
  };

  render() {
    const { showModal, isDownlImages, currImg, images, findText } = this.state;
    if (images.length > 0) {
      console.log(images[currImg]); //imageHeight imageWidth
    }

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleGetImages} />

        {isDownlImages ? (
          <ImageGallery imageList={this.state.images} onClick={this.handleClick} />
        ) : (
          findText && <p>Images not found</p>
        )}
        {isDownlImages && <Button onClick={this.handleGetImages} />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <ButtonClose onClick={this.toggleModal} aria-label="Close modal window">
              <IconButtonClose fill="black" />
            </ButtonClose>
            <img src={images[currImg].largeImageURL} alt={images[currImg].tags} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
