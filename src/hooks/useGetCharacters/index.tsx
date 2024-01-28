import { useEffect, useState } from 'react';
import { api } from 'api';
import { Character } from 'types/Character';

const useGetCharacters = (pageNumber: number) => {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacters = async (page: number) => {
    try {
      const response = await api.characters.fetch(page);

      setCharacters((prevCharacters) => {
        const uniqueIds = new Set(prevCharacters.map((character) => character.id));
        const newCharacters = response.results.filter((newCharacter) => !uniqueIds.has(newCharacter.id));

        return [...prevCharacters, ...newCharacters];
      });
      setHasMore(response.info.next !== null);
    } catch (err) {
      console.error('Error fetching characters:', err);
      setError('Failed to fetch characters. Please try again.'); // Provide a user-friendly error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchCharacters(pageNumber);
  }, [pageNumber]);

  return { loading, characters, hasMore, error };
};

export default useGetCharacters;
