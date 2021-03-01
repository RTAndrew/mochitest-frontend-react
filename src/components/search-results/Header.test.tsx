import { render, screen } from '@testing-library/react';
import React from 'react';

import Header from './Header';

describe('Header Component', () => {
  const headerName: string = 'example';
  const description: string = 'description';

  it('should render WITHOUT children', () => {
    render(<Header headerName={headerName} description={description} />);

    expect(screen.getByText(headerName)).toBeInTheDocument;
    expect(screen.getByText(description)).toBeInTheDocument;
  });

  it('should render WITH a children', () => {
    render(
      <Header headerName={headerName} description={description}>
        <div>children</div>
      </Header>,
    );

    expect(screen.getByText(headerName)).toBeInTheDocument;
    expect(screen.getByText(description)).toBeInTheDocument;

    expect(screen.getByText(/children/i)).toBeInTheDocument;
  });
});
