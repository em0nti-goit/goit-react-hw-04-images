import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import { fetchImages, IMAGES_PER_PAGE } from '../api/fetch-data';
import SearchForm from './SearchForm/SearchForm';
import Searchbar from './Searchbar/Searchbar';
import Notification from './Notification';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

const NOTIFICATION_TYPE = {
  success: 'success',
  error: 'danger',
  warning: 'warning',
  info: 'info',
};

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [notification, setNotification] = useState({
    type: NOTIFICATION_TYPE.info,
    message: '',
  });
  const [showNotification, setShowNotification] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isLoadMoreBtn, setIsLoadMore] = useState(false);

  const handleNotification = (type, message) => {
    setNotification({ type, message });
    setShowNotification(true);
  };

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setIsLoader(true);

      try {
        const data = await fetchImages(query, page);

        if (!data.totalHits) {
          handleNotification(
            NOTIFICATION_TYPE.info,
            'Sorry, there are no images matching your search query. Please try again.'
          );
          setIsLoader(false);
          return;
        }

        setImages(prevImages => [...prevImages, ...data.hits]);

        if (data.totalHits > IMAGES_PER_PAGE) {
          setIsLoadMore(true);
        }

        if (IMAGES_PER_PAGE * page >= data.totalHits) {
          setIsLoadMore(false);
          handleNotification(
            NOTIFICATION_TYPE.info,
            "We're sorry, but you've reached the end of search results."
          );
        }
      } catch (error) {
        console.error('Fetch error:>> ', error);
        handleNotification(
          NOTIFICATION_TYPE.error,
          `Sorry, there is fetching error: ${error.message}. Please try again.`
        );
      } finally {
        setIsLoader(false);
      }
    };
    fetchData();
  }, [query, page]);

  const handleSearchFormSubmit = inputQuery => {
    if (!inputQuery) {
      handleNotification(
        NOTIFICATION_TYPE.warning,
        'Please, input some search query.'
      );
      return;
    }
    setQuery(inputQuery);
    setPage(1);
    setImages([]);
  };

  const handleClickLoadMoreButton = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={styles.app}>
      <Searchbar>
        <SearchForm onSubmit={handleSearchFormSubmit} />
      </Searchbar>
      {showNotification && (
        <Notification
          type={notification.type}
          onClose={() => setShowNotification(false)}
        >
          {notification.message}
        </Notification>
      )}
      <ImageGallery images={images} />
      {isLoader && <Loader />}
      {isLoadMoreBtn && (
        <Button onClick={handleClickLoadMoreButton}>Load more</Button>
      )}
    </div>
  );
};

export default App;
