import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import { CloseButton } from 'react-bootstrap';

const modalRootRef = document.querySelector('#modal-root');

const Modal = ({ url, onClose }) => {
  useEffect(() => {
    const handlerKeyDownEsc = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.position = 'fixed';
    window.addEventListener('keydown', handlerKeyDownEsc);
    // console.log('set eventListener');

    return () => {
      document.body.style.position = '';
      window.removeEventListener('keydown', handlerKeyDownEsc);
      // console.log('remove eventListener');
    };
  }, [onClose]);

  const handleClickOnModal = event => {
    event.stopPropagation();
  };

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={handleClickOnModal}>
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
  onClose: PropTypes.func.isRequired,
};

export default Modal;
