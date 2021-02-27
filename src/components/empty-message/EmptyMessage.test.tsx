import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import EmptyMessage from './EmptyMessage';
import { SearchOutlined } from '@ant-design/icons';

const textMessage: string = 'Lorem ipsum dolor';

describe('EmptyMessage Component - Default props', () => {
  it('should render ONLY the element and the message text', () => {
    render(<EmptyMessage element="0" message="Lorem ipsum dolor" />);

    expect(screen.getByText(/0/i)).toBeInTheDocument();
    expect(screen.getByText(textMessage)).toBeInTheDocument();

    expect(document.querySelectorAll('svg').length).toBe(0);
    expect(document.getElementsByTagName('a').length).toBe(0);
    expect(document.getElementsByTagName('button').length).toBe(0);
  });

  it('should render an icon element', () => {
    render(
      <EmptyMessage
        element={<SearchOutlined className="icon-element" />}
        message="Lorem ipsum dolor"
      />,
    );

    expect(document.getElementsByClassName('icon-element').length).toBe(1);
    expect(document.querySelectorAll('svg').length).toBe(1);
    expect(screen.getByText(textMessage)).toBeInTheDocument();
  });
});

describe('EmptyMessage Component - Actions', () => {
  it('should render a link', () => {
    render(
      <EmptyMessage
        element="0"
        message="Lorem ipsum dolor"
        link={{ title: 'Google', url: 'www.google.com' }}
      />,
    );

    expect(screen.getByText(/0/i)).toBeInTheDocument();
    expect(screen.getByText(textMessage)).toBeInTheDocument();
    expect(screen.getByText(/google/i)).toBeInTheDocument();
    expect(document.getElementsByTagName('a').length).toBe(1);
    expect(document.getElementsByTagName('a')[0].getAttribute('href')).toBe('www.google.com');
  });

  it('should render a button callback', () => {
    const mockClick = jest.fn();

    render(
      <EmptyMessage
        element="0"
        message="Lorem ipsum dolor"
        action={{ title: 'Google', callback: mockClick }}
      />,
    );

    expect(screen.getByText(/0/i)).toBeInTheDocument();
    expect(screen.getByText(textMessage)).toBeInTheDocument();
    expect(screen.getByText(/google/i)).toBeInTheDocument();

    userEvent.click(screen.getByText(/google/i));
    expect(mockClick).toBeCalled;

    userEvent.click(screen.getByText(/google/i));
    expect(mockClick).toBeCalledTimes(2);
  });
});
