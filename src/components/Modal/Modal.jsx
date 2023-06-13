import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import { CloseButton } from 'react-bootstrap';

const modalRootRef = document.querySelector('#modal-root');

class Modal extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
  };

  componentDidMount() {
    // document.body.classList.add('no-scroll');
    document.body.style.position = 'fixed';
    window.addEventListener('keydown', this.handlerKeyDownEsc);
  }

  componentWillUnmount() {
    // document.body.classList.remove('no-scroll');
    document.body.style.position = '';
    window.removeEventListener('keydown', this.handlerKeyDownEsc);
  }

  handlerKeyDownEsc = (e) => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { url, onClose } = this.props;
    return createPortal(
      <div className={styles.overlay} onClick={onClose}>
        <div className={`${styles.modal}`}>
          <img src={url} alt="" />
        </div>
        <div className="position-absolute top-0 end-0 p-3">
          <CloseButton onClick={onClose} variant="white" />
        </div>
      </div>,
      modalRootRef
    );
  }
}

export default Modal;
