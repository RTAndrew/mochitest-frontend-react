import { createContext, Dispatch, SetStateAction } from 'react';

type TStoreContext = {
  query?: string;
  setQuery: Dispatch<SetStateAction<string>>;
  loading?: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  queryResult?: Array<any>;
  setQueryResult: Dispatch<SetStateAction<any[]>>;
  isError?: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
};

const StoreContextProps: TStoreContext = {
  query: '',
  loading: false,
  isError: false,
  queryResult: [],
  setQuery: () => {},
  setQueryResult: () => {},
  setLoading: () => {},
  setIsError: () => {},
};

export const StoreContext = createContext<TStoreContext>(StoreContextProps);
