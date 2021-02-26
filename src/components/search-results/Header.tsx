import React, { FC, ReactNode } from 'react';

interface HeaderProps {
  headerName: string | ReactNode;
  description: string | number | ReactNode;
}

const Header: FC<HeaderProps> = ({ headerName, description, children }) => {
  return (
    <div className="header">
      <div className="header__list">
        <div className="header__items"> {headerName} </div>
        <div className="header__items"> {description}</div>
      </div>

      <div className="header__body"> {children}</div>
    </div>
  );
};

export default Header;
