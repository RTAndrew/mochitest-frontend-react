import React, { useContext } from 'react';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { EmptyMessage, SearchResultsContainer } from 'components';
import { Http } from 'services';
import { StoreContext } from 'contexts';

const { Search } = Input;

const Home = () => {
  const { loading, setLoading, query, setQuery, setQueryResult } = useContext(
    StoreContext,
  );

  async function onSearch(value: string) {
    if (!value) return;

    setQuery(value);
    setLoading(true);

    const { parsedBody } = await Http.get(`search/users?q=${value}`);

    if (!parsedBody) return;
    setLoading(false);

    const query: any = parsedBody;
    setQueryResult(query.items);
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
