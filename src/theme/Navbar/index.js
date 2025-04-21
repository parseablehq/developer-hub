import React from 'react';
import Navbar from '@theme-original/Navbar';
import SearchBar from '@site/src/components/SearchBar';
import styles from './styles.module.css';

export default function NavbarWrapper(props) {
  return (
    <div className={styles.navbarWrapper}>
      <Navbar {...props} />
      <div className={styles.searchBarContainer}>
        <SearchBar />
      </div>
    </div>
  );
}
