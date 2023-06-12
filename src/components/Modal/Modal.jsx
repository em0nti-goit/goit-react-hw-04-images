import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import { CloseButton } from 'react-bootstrap';

const modalRootRef = document.querySelector('#modal-root');

const Modal = ({ url, onClose }) => {
  return createPortal(
    <div className={styles.overlay}>
      <div className={`${styles.modal} w-75`}>
        <img src={url} alt="" />
      </div>
      <div className="position-absolute top-0 end-0 p-3">
        <CloseButton onClick={onClose} variant="white" />
      </div>
    </div>,
    modalRootRef
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Modal;
