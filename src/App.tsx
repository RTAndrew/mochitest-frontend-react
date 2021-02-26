import React, { useState } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import { Home } from 'pages';
import { StoreContext } from 'contexts';

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [queryResult, setQueryResult] = useState<Array<any>>([]);

  const store = {
    loading,
    setLoading,
    query,
    setQuery,
    queryResult,
    setQueryResult,
    isError,
    setIsError,
  };

  return (
    <div className="App container">
      <Router>
        <Switch>
          <StoreContext.Provider value={store}>
            <Route path="/" component={Home} />

            <Route path="*">"404 "</Route>
          </StoreContext.Provider>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
