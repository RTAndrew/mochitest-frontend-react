import { createContext, Dispatch, SetStateAction } from 'react';

type TStoreContext = {
  query?: string;
  setQuery: Dispatch<SetStateAction<string>>;
  loading?: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  queryResult?: Array<any>;
  setQueryResult: Dispatch<SetStateAction<any[]>>;
};

const StoreContextProps: TStoreContext = {
  query: '',
  loading: false,
  queryResult: [],
  setQuery: () => {},
  setQueryResult: () => {},
  setLoading: () => {},
};

export const StoreContext = createContext<TStoreContext>(StoreContextProps);
