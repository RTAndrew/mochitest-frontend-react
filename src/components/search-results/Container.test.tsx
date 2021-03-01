import { render, screen } from '@testing-library/react';
import { StoreContext, StoreContextProps } from 'contexts';
import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Container from './Container';

describe('Container Component', () => {
  let store = StoreContextProps;

  beforeEach(() => {
    store.loading = false;
    store.isError = false;
    store.query = '';
    store.queryResult = {
      total_count: 0,
      incomplete_results: true,
      items: [],
    };
  });

  it('should render a loading spinner', () => {
    store.loading = true;
    render(
      <StoreContext.Provider value={store}>
        <Container />
      </StoreContext.Provider>,
    );

    expect(document.getElementsByClassName('loadingSpinner').length).toBe(1);
  });

  it('should render an error message', () => {
    store.isError = true;
    render(
      <StoreContext.Provider value={store}>
        <Container />
      </StoreContext.Provider>,
    );

    expect(screen.getByText(/we could not process your request/i)).toBeInTheDocument;
  });

  it('should render the results', () => {
    store.queryResult!.items = [
      {
        login: 'Anderson Rodax',
        id: 7697157,
        node_id: 'MDQ6VXNlcjc2OTcxNTc=',
        avatar_url: 'https://avatars.githubusercontent.com/u/7697157?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/ax',
        html_url: 'https://github.com/ax',
        followers_url: 'https://api.github.com/users/ax/followers',
        following_url: 'https://api.github.com/users/ax/following{/other_user}',
        gists_url: 'https://api.github.com/users/ax/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/ax/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/ax/subscriptions',
        organizations_url: 'https://api.github.com/users/ax/orgs',
        repos_url: 'https://api.github.com/users/ax/repos',
        events_url: 'https://api.github.com/users/ax/events{/privacy}',
        received_events_url: 'https://api.github.com/users/ax/received_events',
        type: 'User',
        site_admin: false,
        score: 1.0,
      },
    ];

    render(
      <Router>
        <Switch>
          <StoreContext.Provider value={store}>
            <Container />
          </StoreContext.Provider>
        </Switch>
      </Router>,
    );

    expect(screen.findAllByText(/Anderson Rodax/i)).toBeInTheDocument;
    expect(screen.findAllByText(/users (1)/i)).toBeInTheDocument;
    expect(screen.findAllByText(/COMPANIES (0)/i)).toBeInTheDocument;
  });
});
