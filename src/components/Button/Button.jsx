import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children }) => {
  return (
    <div className="d-flex justify-content-center pagination">
      <button type="button">{children}</button>
    </div>
  );
};

Button.propTypes = {
  children: PropTypes.node,
};

export default Button;
