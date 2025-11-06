import { useEffect, useState } from 'react';

export function useAllCharacters() {
  const [allCharacters, setAllCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllCharacters = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let all = [];
        let nextUrl = 'https://rickandmortyapi.com/api/character/';

        while (nextUrl) {
          const res = await fetch(nextUrl);
          const data = await res.json();
          all = [...all, ...data.results];
          nextUrl = data.info?.next;
        }

        setAllCharacters(all);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCharacters();
  }, []);

  return { allCharacters, isLoading, error };
}
