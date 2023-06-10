import styles from './App.module.css';
import Searchbar from './Searchbar/Searchbar';

export const App = () => {
  return <div className={styles.app}>
    <Searchbar> Test </Searchbar>
  </div>;
};
