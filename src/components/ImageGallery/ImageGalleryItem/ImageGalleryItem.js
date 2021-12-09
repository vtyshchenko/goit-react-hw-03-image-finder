import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.scss';

function imageGalleryItem({ galleryItem, onClick }) {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        id={galleryItem.id}
        className={styles.ImageGalleryItemImage}
        src={galleryItem.webformatURL}
        alt={galleryItem.tags}
        width={galleryItem.previewWidth}
        height={galleryItem.previewHeight}
        onClick={onClick}
      />
    </li>
  );
}

imageGalleryItem.propTypes = {
  galleryItem: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default imageGalleryItem;
