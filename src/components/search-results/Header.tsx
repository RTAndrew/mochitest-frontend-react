import React, { ReactNode } from 'react';

interface HeaderProps {
  headerName: String | ReactNode;
  description: String | Number | ReactNode;
}

const Header = ({ headerName, description }: HeaderProps) => {
  return (
    <div className="header">
      <div className="header__list">
        <div className="header__items"> {headerName} </div>
        <div className="header__items"> {description}</div>
      </div>
    </div>
  );
};

export default Header;
