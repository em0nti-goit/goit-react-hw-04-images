import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onClick, children }) => {
  return (
    <div className="d-flex justify-content-center pagination">
      <button className={styles.button} type="button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Button;
