import { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';

import './App.css';

import Searchbar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import ButtonClose from './components/Modal/ButtonClose';
import Modal from './components/Modal';
import fetchImages from './services/apiService';
import Spinner from './components/Loader';

import { ReactComponent as IconButtonClose } from './images/icon-close.svg';

const INITIAL_STATE = {
  images: [],
  page: 0,
  showModal: false,
  currImg: 0,
  findText: '',
  status: 'idle',
};

class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  static propTypes = {
    images: PropTypes.array,
    page: PropTypes.number,
    showModal: PropTypes.bool,
    currImg: PropTypes.number,
    findText: PropTypes.string,
    status: PropTypes.oneOf(['idle', 'pending', 'resolved', 'rejected']),
  };

  reset = () => {
    this.setState({
      ...INITIAL_STATE,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleGetImages = ({ searchText }) => {
    const setPage = searchText ? 0 : this.state.page;
    const findText = searchText ? searchText.toLowerCase().trim() : this.state.findText;
    const setImages =
      this.state.findText && this.state.findText !== findText ? [] : this.state.images;

    this.setState({
      status: 'pending',
      images: setImages,
      findText: findText,
      page: setPage,
    });

    fetchImages(findText, this.state.page + 1, 12)
      .then(response => {
        this.setState(state => ({
          images: [...state.images, ...response],
          page: state.page + 1,
          status: 'resolved',
        }));
      })
      .catch(() => {
        this.setState({
          status: 'rejected',
        });
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

  handleRight = () => {
    const { images, currImg } = this.state;

    this.setState({
      currImg: currImg === images.length - 1 ? 0 : currImg + 1,
    });
  };

  handleLeft = () => {
    const { images, currImg } = this.state;

    this.setState({
      currImg: currImg === 0 ? images.length - 1 : currImg - 1,
    });
  };

  render() {
    const { showModal, currImg, images, findText, status } = this.state;

    const isShow = status === 'resolved' || status === 'pending';
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleGetImages} />

        {status === 'rejected' && <p>Error. No images were found for your query: {findText}...</p>}
        {isShow && (
          <>
            <ImageGallery imageList={images} onClick={this.handleClick} />
            {status === 'pending' ? <Spinner /> : <Button onClick={this.handleGetImages} />}
          </>
        )}
        {showModal && (
          <Modal onClose={this.toggleModal} onLeft={this.handleLeft} onRight={this.handleRight}>
            <ButtonClose onClick={this.toggleModal} aria-label="Close modal window">
              <IconButtonClose fill="black" />
            </ButtonClose>
            <img src={images[currImg].largeImageURL} alt={images[currImg].tags} />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
