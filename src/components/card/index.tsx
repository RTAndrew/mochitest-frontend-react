import React from 'react';

interface CardProps {
  data: {
    avatar_url: string;
    login: string;
    name?: string;
    type: 'Organization' | 'User';
  };
}

const Card = ({ data }: CardProps) => {
  return (
    <div className="card">
      <img src={data.avatar_url} alt="#" className="card__avatar" />
      <div className="card__body">
        <div className="card__header">{data.login}</div>
        <div className="card__name">{data.name}</div>
      </div>
      <div className="card__footer"></div>
    </div>
  );
};

export default Card;
