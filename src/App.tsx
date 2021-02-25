import React, { useState } from 'react';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { EmptyMessage, SearchResultsContainer } from 'components';
import { Http } from 'services';

const { Search } = Input;

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<String>('');
  const [queryResult, setQueryResult] = useState<Array<any>>([]);

  async function onSearch(value: String) {
    if (!value) return;

    setQuery(value);
    setLoading(true);

    const { parsedBody } = await Http.get(`search/users?q=${value}`);

    if (parsedBody) {
      setLoading(false);

      const query: any = parsedBody;
      setQueryResult(query.items);
    }
  }

  return (
    <div className="App container">
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
          <SearchResultsContainer loading={loading} results={queryResult} />
        )}
      </div>
    </div>
  );
};

export default App;
