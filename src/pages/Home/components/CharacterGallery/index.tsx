import React, { useCallback, useRef, useState } from 'react';
import styles from './index.module.scss';
import useGetCharacters from 'hooks/useGetCharacters';

const CharacterGallery: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const {
    characters,
    hasMore,
    loading,
    error,
  } = useGetCharacters(pageNumber);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastCharacterElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !node) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      observer.current.observe(node);
    },
    [loading, hasMore],
  );

  return (
    <>
      <div className={styles.container}>
        {characters.map((character, index) => (
          <div
            ref={index === characters.length - 1 ? lastCharacterElementRef : null}
            key={character.id}
            className={styles.item}
          >
            <img className={styles.image} src={character.image} alt={character.name} />
            <p className={styles.caption}>{character.name}</p>
          </div>
        ))}
      </div>
      <div className={styles.text}>
        {loading && 'Loading...'}
        {error && `Error: ${error}`}
      </div>
    </>
  );
};

export default CharacterGallery;
