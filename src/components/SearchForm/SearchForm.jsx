import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './SearchForm.module.css';

const SearchForm = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleInputOnCnange = e => {
    setInput(e.currentTarget.value);
  };

  const handleFormOnSubmit = e => {
    e.preventDefault();
    onSubmit(input.trim());
  };

  return (
    <form className={styles.form} onSubmit={handleFormOnSubmit}>
      <button type="submit" className={styles.button}>
        <svg width="20" height="20" viewBox="0 0 20 20">
          <path
            d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
            stroke="currentColor"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <span className={styles.buttonLabel}>Search</span>
      </button>

      <input
        className={styles.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        name="input"
        value={input}
        onChange={handleInputOnCnange}
      />
    </form>
  );
};

SearchForm.propTypes = { onSubmit: PropTypes.func.isRequired };

export default SearchForm;