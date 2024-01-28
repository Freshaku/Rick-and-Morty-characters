import React, { useCallback, useRef, useState } from 'react';
import styles from './index.module.scss';
import useGetCharacters from 'hooks/useGetCharacters';
import Spinner from 'components/Spinner';

type ImageStateMap = Map<number, boolean>;

const CharacterGallery: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const {
    characters,
    hasMore,
    loading,
    error,
  } = useGetCharacters(pageNumber);

  const [imageStates, setImageStates] = useState<ImageStateMap>(
    new Map(characters.map((character) => [character.id, false])),
  );

  const observer = useRef<IntersectionObserver | null>(null);

  const handleImageLoad = (id: number) => {
    setImageStates((prevStates) => {
      const newStates = new Map(prevStates);
      newStates.set(id, true);
      return newStates;
    });
  };

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
            ref={index === characters.length - 1 ? (node) => lastCharacterElementRef(node) : null}
            key={character.id}
            className={styles.item}
          >
            <img
              className={styles.image}
              src={character.image}
              alt={character.name}
              onLoad={() => handleImageLoad(character.id)}
              style={{ display: imageStates.get(character.id) ? 'block' : 'none' }}
              />
            {!imageStates.get(character.id) && <Spinner />}
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