import PropTypes from 'prop-types';

import styles from './ImageGallery.module.scss';

import ImageGalleryItem from './ImageGalleryItem';

function ImageGallery({ imageList }) {
  return (
    <ul className={styles.ImageGallery}>
      {imageList.map(item => (
        <ImageGalleryItem galleryItem={item} />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.object),
};

export default ImageGallery;
