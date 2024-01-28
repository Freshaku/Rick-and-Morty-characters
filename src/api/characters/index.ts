import axios from 'axios';
import { CharactersResponse } from './types';

export const characters = {
  fetch: async (page: number): Promise<CharactersResponse> => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`);

      return response.data;
    } catch (err) {
      console.error('Error fetching characters:', err);
      throw err;
    }
  },
};