import React, { Component } from 'react';
import styles from './App.module.css';
import { fetchImages } from '../api/fetch-data';
import SearchForm from './SearchForm/SearchForm';
import Searchbar from './Searchbar/Searchbar';
import Notification from './Notification';

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
      fetchImages(query, page).then(data=>);
    }
  }

  handleSearchFormSubmit = query => {
    if (!query) {
      this.setState({
        notification: {
          type: NOTIFICATION_TYPE.warning,
          message: 'Please, input some search query',
          show: true,
        },
      });
      return;
    }
    this.setState({ query });
  };

  closeNotification = () => {
    this.setState({ notification: { show: false } });
  };

  render() {
    const { notification } = this.state;
    return (
      <div className={styles.app}>
        <Searchbar>
          <SearchForm onSubmit={this.handleSearchFormSubmit} />
        </Searchbar>
        {notification.show && (
          <Notification type={notification.type} onClose={this.closeNotification}>
            {notification.message}
          </Notification>
        )}
      </div>
    );
  }
}
