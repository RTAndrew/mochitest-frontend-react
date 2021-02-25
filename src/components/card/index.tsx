import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  data: {
    avatar_url: string;
    login: string;
    name?: string;
    type: 'Organization' | 'User';
  };
}

const Card = ({ data }: CardProps) => {

  function getCardLink(): string {
    if (data.type === 'Organization') return `/orgs/${data.login}`;

    return `/users/${data.login}`;
  }

  return (
    <Link to={getCardLink()} className="card">
      <img src={data.avatar_url} alt="" className="card__avatar" />
      <div className="card__body">
        <div className="card__header">{data.login}</div>
        <div className="card__name">{data.name}</div>
      </div>
      <div className="card__footer"></div>
    </Link>
  );
};

export default Card;
