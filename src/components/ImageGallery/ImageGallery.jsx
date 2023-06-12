import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, imgOnClick }) => {
  return (
    <ul className={styles.gallery}>
      {images.map(({ id, ...image }) => {
        return <ImageGalleryItem key={id} {...image} imgOnClick={imgOnClick} />;
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};

export default ImageGallery;
