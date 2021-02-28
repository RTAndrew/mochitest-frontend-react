import { SearchResults } from 'models/HttpResponse.types';
import { createContext } from 'react';

export type TStoreContext = {
  query?: string;
  setQuery: (query: string) => void;
  loading?: boolean;
  setLoading: (value: boolean) => void;
  queryResult?: SearchResults;
  setQueryResult: (results: SearchResults) => void;
  isError?: boolean;
  setIsError: (value: boolean) => void;
};

export const StoreContextProps: TStoreContext = {
  query: '',
  loading: false,
  isError: false,
  queryResult: {
    total_count: 0,
    incomplete_results: true,
    items: [],
  },
  setQuery: () => '',
  setQueryResult: () => {},
  setLoading: () => {},
  setIsError: () => {},
};

export const StoreContext = createContext(StoreContextProps);
