import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Http } from 'services';

interface CardProps {
  data: {
    avatar_url: string;
    login: string;
    name?: string;
    type: 'Organization' | 'User';
  };
}

const Card = ({ data }: CardProps) => {
  const { type, login } = data;

  const [additionalInfo, setAdditionalInfo] = useState<any>({});
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    fetchAll(login, type);

    return () => {
      setAdditionalInfo({});
    };
    // eslint-disable-next-line
  }, [login, type]);

  async function fetchAll(login: string, type: string) {
    try {
      const additionalInfo = await fetchAdditionalInfo(login);
      setAdditionalInfo(additionalInfo);

      if (type === 'Organization') {
        const people = await fetchOrganizationPeople(login);
        setCount(people);
      } else {
        const commits = await fetchUserCommits(login);
        setCount(commits);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function fetchAdditionalInfo(login: string) {
    const { parsedBody } = await Http.get(`users/${login}`);
    return parsedBody;
  }

  async function fetchOrganizationPeople(login: string) {
    const { parsedBody } = await Http.get(`orgs/${login}/members`);

    const result: any = parsedBody;
    return result.length;
  }

  async function fetchUserCommits(login: string) {
    const { parsedBody } = await Http.get(
      `search/commits?q=author:${login}&sort=author-date&order=desc`,
    );

    const result: any = parsedBody;
    return result.total_count;
  }

  function getCardLink(): string {
    if (data.type === 'Organization') return `/orgs/${data.login}`;
    return `/users/${data.login}`;
  }

  return (
    <Link to={getCardLink()} className="card">
      <img src={data.avatar_url} alt="" className="card__avatar" />
      <div className="card__body">
        <div className="card__header">{data.login}</div>
        <div className="card__name">{additionalInfo.name}</div>
      </div>
      <div className="card__footer">{count}</div>
    </Link>
  );
};

export default Card;
