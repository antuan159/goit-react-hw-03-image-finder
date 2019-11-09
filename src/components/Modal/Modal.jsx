import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const MODAL_ROOT = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  overleyRef = createRef();

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.code !== 'Escape') {
      return;
    }
    this.props.onClose();
  };

  handleOverleyClick = e => {
    const { current } = this.overleyRef;
    if (current && e.target !== current) {
      return;
    }
    this.props.onClose();
  };

  render() {
    const { src } = this.props;
    return createPortal(
      <div
        className={styles.overlay}
        ref={this.overleyRef}
        onClick={this.handleOverleyClick}
        role="presentation"
      >
        <div className={styles.modal}>
          <img src={src} alt="big-foto" />
        </div>
      </div>,
      MODAL_ROOT,
    );
  }
}
