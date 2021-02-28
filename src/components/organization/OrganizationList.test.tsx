import { render, screen } from '@testing-library/react';
import { StoreContext } from 'contexts';
import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import OrganizationList from './OrganizationList';

describe('OrganizationList Container Component', () => {
  const loading: boolean = false;
  const isError: boolean = false;
  const setLoading = () => {};
  const setIsError = () => {};
  const query: string = '';
  const setQuery = () => {};
  const queryResult: any[] = [];
  const setQueryResult = () => {};

  const store = {
    loading,
    isError,
    setLoading,
    setIsError,
    query,
    setQuery,
    queryResult,
    setQueryResult,
  };

  beforeEach(() => {
    store.loading = false;
    store.isError = false;
    store.query = '';
    store.queryResult = [];
  });

  it('should show an empty message if there is an empty array', () => {
    store.queryResult = [];
    render(
      <Router>
        <Switch>
          <StoreContext.Provider value={store}>
            <OrganizationList />
          </StoreContext.Provider>
        </Switch>
      </Router>,
    );

    expect(screen.getByText(/Hummm... We didn't find any companies.../i)).toBeInTheDocument;
    expect(screen.findAllByText(/users (0)/i)).toBeInTheDocument;
    expect(screen.findAllByText(/companies (0)/i)).toBeInTheDocument;
  });

  it('should not show an empty, and should render results', () => {
    store.queryResult = [
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
            <OrganizationList />
          </StoreContext.Provider>
        </Switch>
      </Router>,
    );

    expect(screen.findAllByText(/users (1)/i)).toBeInTheDocument;
    expect(screen.findAllByText(/companies (0)/i)).toBeInTheDocument;
    expect(screen.findAllByText(/Anderson Rodax/i)).toBeInTheDocument;

    store.queryResult = [
      {
        login: 'Mochi',
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
        type: 'Organization',
        site_admin: false,
        score: 1.0,
      },
    ];
    render(
      <Router>
        <Switch>
          <StoreContext.Provider value={store}>
            <OrganizationList />
          </StoreContext.Provider>
        </Switch>
      </Router>,
    );

    expect(screen.findAllByText(/users (0)/i)).toBeInTheDocument;
    expect(screen.findAllByText(/companies (1)/i)).toBeInTheDocument;
    expect(screen.findAllByText(/mochi/i)).toBeInTheDocument;
  });
});
