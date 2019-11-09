import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import Gallery from '../Gallery';
import SearchForm from '../SearchForm';
import LoadMore from '../LoadMore';
import api from '../Services/api';
import styles from './App.module.css';
import scrollPage from '../Services/scrollPage';
import Modal from '../Modal';

const notyf = new Notyf();

export default class App extends Component {
  state = {
    cards: [],
    query: '',
    pageNumber: 1,
    isLoading: false,
    error: null,
    imageLarge: null,
    isModalOpen: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;
    if (prevState.query !== query) {
      this.fetchCards();
    }
  }

  onSubmit = query => {
    this.setState({ query, pageNumber: 1, cards: [] });
  };

  fetchCards = () => {
    const { query, pageNumber } = this.state;
    this.setState({ isLoading: true });
    api
      .fetchCards(query, pageNumber)
      .then(hits => {
        this.setState(prevState => ({
          cards: [...prevState.cards, ...hits],
          pageNumber: prevState.pageNumber + 1,
        }));
      })
      .catch(error => {
        this.setState({ error });
      })
      .finally(() => {
        this.setState({ isLoading: false }, scrollPage);
      });
  };

  onImageLarge = e => {
    const tmp = this.state.cards.find(item => item.id === e);
    if (tmp) {
      this.setState({ imageLarge: tmp.largeImageURL }, this.openModal);
    }
  };

  openModal = () => this.setState({ isModalOpen: true });

  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { cards, isLoading, error, imageLarge, isModalOpen } = this.state;
    return (
      <div className={styles.app}>
        <SearchForm onSubmit={this.onSubmit} />
        {error && notyf.error(error.message)}
        {isLoading && (
          <Loader type="Puff" color="#00BFFF" height={50} width={50} />
        )}
        {cards.length > 0 && (
          <Gallery cards={cards} onImageLarge={this.onImageLarge} />
        )}
        {cards.length > 0 && (
          <LoadMore onClick={this.fetchCards} disabled={isLoading} />
        )}
        {isModalOpen && <Modal src={imageLarge} onClose={this.closeModal} />}
      </div>
    );
  }
}
