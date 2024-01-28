import { useEffect, useState } from 'react';
import { api } from 'api';
import { Character } from 'types/Character';

export default function useGetCharacters(pageNumber: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const fetchCharacters = async (page: number) => {
    try {
      const response = await api.characters.fetch(page);

      setCharacters(prevCharacters => {
        const uniqueIds = new Set(prevCharacters.map(character => character.id));
        const newCharacters = response.results.filter(newCharacter => !uniqueIds.has(newCharacter.id));

        return [...prevCharacters, ...newCharacters];
      });
      setLoading(false);
      setHasMore(response.info.next !== null);
    } catch (err) {
      console.error('Error fetching characters:', err);
      setError(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchCharacters(pageNumber);
  }, [pageNumber]);

  return { loading, error, characters, hasMore };
}