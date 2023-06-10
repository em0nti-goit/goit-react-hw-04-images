import React from 'react'
import PropTypes from 'prop-types'
import styles from './Searchbar.module.css';


export default function Searchbar({children}) {
  return <header className={styles.searchbar}>{children}</header>;
}

Searchbar.propTypes = {
  children: PropTypes.node,
}
