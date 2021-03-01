import { SearchOutlined } from '@ant-design/icons';
import { Input, Spin } from 'antd';
import { EmptyMessage, SearchResultsContainer } from 'components';
import { StoreContext } from 'contexts';
import { SearchResults, UserAndOrganizations } from 'models/HttpResponse.types';
import React, { useContext, useRef, useState } from 'react';
import { Http } from 'services';
import validator from 'validator';

const { Search } = Input;

const Home = () => {
  const {
    loading,
    setLoading,
    query,
    setQuery,
    setIsError,
    setQueryResult,
    queryResult,
  } = useContext(StoreContext);

  const [hasResultsEnded, setHasResultsEnded] = useState<boolean>(false);
  const [isLoadingMoreResults, setIsLoadingMoreResults] = useState<boolean>(false);

  const searchIndex = useRef<number>(0);
  const queryValue = useRef<string | undefined>(query);

  async function fetch(value: string, index: number): Promise<SearchResults | undefined> {
    try {
      const { parsedBody } = await Http.get<SearchResults>(
        `search/users?q=${value}&page=${index + 1}&per_page=5`,
      );

      if (!parsedBody) return;

      setIsError(false);
      return parsedBody;
    } catch (error) {
      setIsError(true);
    }
  }

  function calculateSearchValue(value: string): void {
    if (queryValue.current === value) {
      searchIndex.current = searchIndex.current + 1;
    } else {
      queryValue.current = value;
      searchIndex.current = 0;
      setHasResultsEnded(false);
    }
  }

  async function fetchMore(value: string): Promise<void> {
    calculateSearchValue(value);
    setIsLoadingMoreResults(true);

    let queryResultCopy: UserAndOrganizations[] = queryResult!.items;

    try {
      const newResults = await fetch(value, searchIndex.current);
      // Can't mutate the newResults directly
      // So, we will have to copy it then mutate it
      const copyNewResults = newResults;

      if (newResults!.total_count > 0 && newResults!.items.length === 0) {
        setHasResultsEnded(true);
      } else {
        queryResultCopy = [...queryResultCopy, ...newResults!.items];
        copyNewResults!.items = queryResultCopy;
        setQueryResult(copyNewResults!);
      }
    } catch (error) {
      setIsError(true);;
    }

    setIsLoadingMoreResults(false);
  }

  async function onSearch(value: string): Promise<void> {
    if (queryValue.current === value) return;

    calculateSearchValue(value);

    if (validator.isEmpty(value)) return;

    value = validator.escape(value);

    setQuery(value);
    setLoading(true);
    setIsError(false);

    try {
      const parsedBody = await fetch(value, searchIndex.current);

      if (!parsedBody) return;

      setQueryResult(parsedBody);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setIsError(true);
    }
  }

  return (
    <div className="homeScreen">
      <h1 className="App__header"> Search for Github Users. </h1>
      <div className="searchInput">
        <Search
          allowClear
          enterButton
          size="large"
          loading={loading}
          onSearch={onSearch}
          placeholder="Type a user name here"
        />
        {!query ? (
          <EmptyMessage
            element={<SearchOutlined />}
            message="Enter a login, name or a company you are looking for."
          />
        ) : (
          <>
            <SearchResultsContainer />
            {!hasResultsEnded && queryResult!.items.length > 0 && (
              <div onClick={() => fetchMore(query!)} className="searchInput__showMore">
                {isLoadingMoreResults ? <Spin /> : 'Show More'}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
