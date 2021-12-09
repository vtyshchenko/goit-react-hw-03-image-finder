import PropTypes from 'prop-types';

import styles from './ImageGallery.module.scss';

import ImageGalleryItem from './ImageGalleryItem';

function ImageGallery({ imageList, onClick }) {
  return (
    <ul className={styles.ImageGallery}>
      {imageList.map(item => (
        <ImageGalleryItem key={item.id.toString()} galleryItem={item} onClick={onClick} />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
};

export default ImageGallery;
