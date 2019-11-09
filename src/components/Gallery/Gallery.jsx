import React from 'react';
import T from 'prop-types';
import PhotoCard from '../PhotoCard';
import styles from './Gallery.module.css';

const Gallery = ({ cards, onImageLarge }) => (
  <ul className={styles.gallery}>
    {cards.map(item => (
      <li key={item.id} className={styles.galleryItem}>
        <PhotoCard
          likes={item.likes}
          views={item.views}
          comments={item.comments}
          downloads={item.downloads}
          webformatURL={item.webformatURL}
          tags={item.tags}
          id={item.id}
          onImageLarge={onImageLarge}
        />
      </li>
    ))}
  </ul>
);

Gallery.propTypes = {
  cards: T.arrayOf(
    T.shape({
      id: T.number.isRequired,
      likes: T.number.isRequired,
      views: T.number.isRequired,
      comments: T.number.isRequired,
      downloads: T.number.isRequired,
      webformatURL: T.string.isRequired,
      tags: T.string.isRequired,
    }).isRequired,
  ).isRequired,
  onImageLarge: T.func.isRequired,
};

export default Gallery;
