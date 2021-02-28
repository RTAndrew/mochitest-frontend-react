import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Card from './Card';

describe('Card Component', () => {
  interface CardProps {
    data: {
      avatar_url: string;
      login: string;
      name?: string;
      type: 'Organization' | 'User';
    };
  }

  let props: CardProps = {
    data: {
      avatar_url: 'https://avatars.githubusercontent.com/u/873584?v=4',
      login: '88250',
      type: 'User',
    },
  };

  it('should render card', () => {
    render(
      <Router>
        <Switch>
          <Card data={props.data} />
        </Switch>
      </Router>,
    );

    expect(screen.findAllByText(/88250/i)).toBeInTheDocument;
  });
});
