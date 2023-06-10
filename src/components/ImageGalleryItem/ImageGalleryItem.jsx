import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  return (
    <li className={styles.galleryItem}>
      <img className={styles.galleryItemImage} src={webformatURL} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL:PropTypes.string,
  tags: PropTypes.string
};

export default ImageGalleryItem;
