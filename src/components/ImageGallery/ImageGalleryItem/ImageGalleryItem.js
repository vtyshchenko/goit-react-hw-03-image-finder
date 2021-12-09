import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.scss';

function imageGalleryItem({ galleryItem }) {
  return (
    <li key={galleryItem.id} className={styles.item}>
      <img
        src={galleryItem.webformatURL}
        alt={galleryItem.tags}
        data={galleryItem.largeImageURL}
        width={galleryItem.previewWidth}
        height={galleryItem.previewHeight}
      />
    </li>
  );
}

imageGalleryItem.propTypes = {
  contctsList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default imageGalleryItem;
