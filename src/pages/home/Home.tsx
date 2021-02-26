import React, { useContext } from 'react';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { EmptyMessage, SearchResultsContainer } from 'components';
import { StoreContext } from 'contexts';
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
  } = useContext(StoreContext);

  async function onSearch(value: string) {
    if (validator.isEmpty(value)) return;

    value = validator.escape(value);

    setQuery(value);
    setLoading(true);
    setIsError(false);

    try {
      const { parsedBody } = await Http.get(`search/users?q=${value}`);

      if (!parsedBody) return;

      const query: any = parsedBody;
      setQueryResult(query.items);

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
          <SearchResultsContainer />
        )}
      </div>
    </div>
  );
};

export default Home;
