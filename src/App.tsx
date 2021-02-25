import React, { useState } from 'react';

import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { EmptyMessage } from 'components';
import './App.scss';

const { Search } = Input;

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<String>('');

  function onSearch(value: String) {
    setLoading(true);
    setQuery(value);

    setInterval(() => {
      setLoading(false);
    }, 1500);
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

        <EmptyMessage
          element={<SearchOutlined  />}
          message="Enter a login, name or a company you are looking for."
        />
      </div>
    </div>
  );
};

export default App;
