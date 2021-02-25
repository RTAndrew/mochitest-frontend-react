import React, { ReactNode } from 'react';

interface EmptyMessageProps {
  element: ReactNode | string | Number;
  message: string;
  link?: {
    title: string;
    url: string;
  };
  action?: {
    title: string;
    callback: () => void;
  };
}

const EmptyMessage = ({
  element,
  message,
  link,
  action,
}: EmptyMessageProps) => {
  return (
    <div className={`emptyMessage`}>
      <div className="emptyMessage__element"> {element} </div>
      <div className="emptyMessage__message">{message}</div>
      <a href={link?.url} className="emptyMessage__action">
        {link?.title}
      </a>
      <a className="emptyMessage__action" onClick={action?.callback}>
        {action?.title}
      </a>
    </div>
  );
};

export default EmptyMessage;
