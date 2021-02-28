import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Home from './Home';

describe('Home Component', () => {
  it('should show an empty message if it has not been queried yet', () => {
    render(<Home />);
    expect(screen.getByText(/Enter a login, name or a company you are looking for./i))
      .toBeInTheDocument;
  });

  it('should not submit search on empty value', () => {
    render(<Home />);

    userEvent.type(screen.getByPlaceholderText(/type a user name here/i), ' ');
    userEvent.click(document.getElementsByClassName('ant-btn-primary')[0]);

    expect(screen.getByText(/Enter a login, name or a company you are looking for./i))
      .toBeInTheDocument;
  });

  it('should successfully submit a search', () => {
    render(<Home />);

    userEvent.type(screen.getByPlaceholderText(/type a user name here/i), 'ax');
    userEvent.click(document.getElementsByClassName('ant-btn-primary')[0]);

    expect(screen.getByText(/Enter a login, name or a company you are looking for./i)).not
      .toBeInTheDocument;
  });

  it('should not get any results when submiting a random number', () => {
    render(<Home />);

    userEvent.type(screen.getByPlaceholderText(/type a user name here/i), Math.random().toString());
    userEvent.click(document.getElementsByClassName('ant-btn-primary')[0]);

    expect(screen.findAllByText(/users (0)/i)).toBeInTheDocument;
    expect(screen.findAllByText(/companies (0)/i)).toBeInTheDocument;
    expect(screen.findAllByText(/Hummm... We didn't find any users.../i)).toBeInTheDocument;
  });

  it('should fail on submiting an empty string', () => {
    render(<Home />);

    userEvent.type(screen.getByPlaceholderText(/type a user name here/i), '      ');
    userEvent.click(document.getElementsByClassName('ant-btn-primary')[0]);

    expect(screen.findAllByText(/Oops... we could not process your request./i)).toBeInTheDocument;
  });
});
