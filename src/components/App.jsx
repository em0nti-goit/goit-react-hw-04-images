import React, { Component } from 'react';
import styles from './App.module.css';
import { fetchImages, IMAGES_PER_PAGE } from '../api/fetch-data';
import SearchForm from './SearchForm/SearchForm';
import Searchbar from './Searchbar/Searchbar';
import Notification from './Notification';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';

const NOTIFICATION_TYPE = {
  success: 'success',
  error: 'danger',
  warning: 'warning',
  info: 'info',
};

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    notification: {
      type: NOTIFICATION_TYPE.info,
      message: '',
      show: false,
    },
    isLoadMore: false,
  };

  displayLoadMoreButton = isShow => {
    this.setState({ isLoadMore: isShow });
  };

  showNotification = (type, message) => {
    this.setState({
      notification: {
        type,
        message,
        show: true,
      },
    });
  };

  closeNotification = () => {
    this.setState({ notification: { show: false } });
  };

  handleFetchError = error => {
    console.error('Fetch error:>> ', error);
    this.showNotification(
      NOTIFICATION_TYPE.error,
      `Sorry, there is fetching error: ${error.message}. Please try again.`
    );
  };

  handleSearchFormSubmit = query => {
    if (!query) {
      this.showNotification(
        NOTIFICATION_TYPE.warning,
        'Please, input some search query.'
      );
      return;
    }
    this.setState({ query }, () => {
      const { query, page } = this.state;
      fetchImages(query, page)
        .then(data => {
          console.log('data :>> ', data);

          if (!data.totalHits) {
            this.showNotification(
              NOTIFICATION_TYPE.info,
              'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
          }

          this.setState({ images: data.hits, isLoadMore: false });

          if (data.totalHits > IMAGES_PER_PAGE) {
            this.displayLoadMoreButton(true);
          }
        })
        .catch(error => {
          this.handleFetchError(error);
        });
    });
  };

  handleOnClickLoadMoreButton = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        const { query, page } = this.state;
        fetchImages(query, page)
          .then(data => {
            this.setState(prevState => ({
              images: [...prevState.images, ...data.hits],
            }));

            if (IMAGES_PER_PAGE * page >= data.totalHits) {
              this.displayLoadMoreButton(false);
            }
          })
          .catch(error => {
            this.handleFetchError(error);
          });
      }
    );
  };

  render() {
    const { images, notification, isLoadMore } = this.state;
    return (
      <div className={styles.app}>
        <Searchbar>
          <SearchForm onSubmit={this.handleSearchFormSubmit} />
        </Searchbar>
        {notification.show && (
          <Notification
            type={notification.type}
            onClose={this.closeNotification}
          >
            {notification.message}
          </Notification>
        )}
        <ImageGallery images={images} />
        {isLoadMore && (
          <Button onClick={this.handleOnClickLoadMoreButton}>Load more</Button>
        )}
      </div>
    );
  }
}
