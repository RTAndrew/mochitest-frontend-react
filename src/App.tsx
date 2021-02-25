import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import { Home } from 'pages';

const App = () => {
  return (
    <div className="App container">
      <Router>
        <Switch>
          {/* <Route path="/organizations" component={DashboardSignIn} /> */}
          {/* <Route path="/users" component={Dashboard} /> */}
          <Route path="/" component={Home} />

          <Route path="*">"404 "</Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
