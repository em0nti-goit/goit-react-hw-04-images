import React, { Component } from 'react';
import styles from './App.module.css';
import { fetchImages } from '../api/fetch-data';
import SearchForm from './SearchForm/SearchForm';
import Searchbar from './Searchbar/Searchbar';
import Notification from './Notification';
import ImageGallery from './ImageGallery/ImageGallery';

const NOTIFICATION_TYPE = {
  success: 'success',
  error: 'danger',
  warning: 'warning',
  info: 'info',
};

export class App extends Component {
  state = {
    images: null,
    query: '',
    page: 1,
    notification: {
      type: NOTIFICATION_TYPE.info,
      message: '',
      show: false,
    },
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      fetchImages(query, page).then(data => {
        console.log('data :>> ', data);

        if (!data.totalHits) {
          this.showNotification(
            NOTIFICATION_TYPE.info,
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        this.setState({ images: data.hits });
      });
      //---/fetchImages----
    }
  }

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

  handleSearchFormSubmit = query => {
    if (!query) {
      this.showNotification(
        NOTIFICATION_TYPE.warning,
        'Please, input some search query.'
      );
      return;
    }
    this.setState({ query });
  };

  render() {
    const { images, notification } = this.state;
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
        {images && <ImageGallery images={images} />}
      </div>
    );
  }
}
