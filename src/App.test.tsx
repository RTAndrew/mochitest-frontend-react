// app.test.js
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

import '@testing-library/jest-dom/extend-expect';

import App from './App';

describe('full app rendering', () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    history.push('/');

    render(
      <Router history={history}>
        <App />
      </Router>,
    );
  });

  it('should display header text', () => {
    expect(screen.getByText(/search for github users./i)).toBeInTheDocument();
  });

  it('should have form input for searching', () => {
    expect(screen.getByPlaceholderText(/type a user name here/i)).toBeInTheDocument();
  });

  it("should show an empty message because the user hasn't searched yet", () => {
    expect(document.getElementsByClassName('emptyMessage').length).toBe(1);
  });
});
