import PropTypes from 'prop-types';
import { Component } from 'react';

import styles from './SearchBar.module.scss';

const INITIAL_STATE = {
  searchText: '',
};

class SearchBar extends Component {
  state = {
    ...INITIAL_STATE,
  };

  static propTypes = {
    searchText: PropTypes.string,
  };

  reset = () => {
    this.setState({
      ...INITIAL_STATE,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit({ ...this.state });
    this.reset();
  };

  handleChange = event => {
    this.setState({ searchText: event.target.value });
  };

  render() {
    const { searchText } = this.state;

    return (
      <header className={styles.searchbar}>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <button type="submit" className={styles.formButton}>
            <span className={styles.formButtonLabel}>Search</span>
          </button>
          <input
            className={styles.formInput}
            type="text"
            autoComplete="off"
            autoFocus
            value={searchText}
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
