import React from 'react';
import PropTypes from 'prop-types';
import styles from './LoadMore.module.css';

const LoadMore = ({ onClick, disabled }) => (
  <button
    type="button"
    className={styles.button}
    onClick={onClick}
    disabled={disabled}
  >
    LoadMore
  </button>
);

LoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default LoadMore;
