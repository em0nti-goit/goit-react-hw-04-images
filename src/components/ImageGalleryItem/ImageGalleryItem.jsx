import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

const ImageGalleryItem = ({
  webformatURL,
  webformatWidth,
  webformatHeight,
  largeImageURL,
  tags,
}) => {
  
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <li className={styles.galleryItem} onClick={openModal}>
        <img
          className={styles.galleryItemImage}
          src={webformatURL}
          alt={tags}
          width={webformatWidth}
          height={webformatHeight}
        />
      </li>
      {showModal && <Modal url={largeImageURL} onClose={closeModal} />}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  webformatWidth: PropTypes.number,
  webformatHeight: PropTypes.number,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
};

export default ImageGalleryItem;
