import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Http } from 'services';
import {
  UserAdditionalInfo,
  OrganizationMembers,
  SearchAuthorCommits,
} from 'models/HttpResponse.types';
import { CardProps } from 'models/Props';
import { StoreContext } from 'contexts';

const Card = ({ data }: CardProps) => {
  const { setIsError } = useContext(StoreContext);
  const { avatar_url, login, type } = data;
  const DEFAULT_PROPS = { name: '', ...data };

  const [additionalInfo, setAdditionalInfo] = useState<UserAdditionalInfo>(DEFAULT_PROPS);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    fetchAll(login, type);

    return () => {
      setAdditionalInfo(DEFAULT_PROPS);
    };
    // eslint-disable-next-line
  }, [login, type]);

  async function fetchAll(login: string, type: string): Promise<void> {
    try {
      const additionalInfo = await fetchAdditionalInfo(login);
      setAdditionalInfo(additionalInfo!);

      if (type === 'Organization') {
        const people = await fetchOrganizationMembers(login);
        setCount(people!);
      } else {
        const commits = await fetchUserCommits(login);
        setCount(commits);
      }
    } catch (error) {
      setIsError(true);
    }
  }

  async function fetchAdditionalInfo(login: string): Promise<UserAdditionalInfo | undefined> {
    const { parsedBody } = await Http.get<UserAdditionalInfo>(`users/${login}`);
    return parsedBody;
  }

  async function fetchOrganizationMembers(login: string): Promise<number> {
    const { parsedBody } = await Http.get<OrganizationMembers>(`orgs/${login}/members`);

    return parsedBody!.length;
  }

  async function fetchUserCommits(login: string): Promise<number> {
    const { parsedBody } = await Http.get<SearchAuthorCommits>(
      `search/commits?q=author:${login}&sort=author-date&order=desc`,
    );

    return parsedBody!.total_count;
  }

  function getCardLink(): string {
    if (type === 'Organization') return `/orgs/${login}`;
    return `/users/${login}`;
  }

  return (
    <Link to={getCardLink()} className="card">
      <img src={avatar_url} alt="" className="card__avatar" />
      <div className="card__body">
        <div className="card__header">{login}</div>
        <div className="card__name">{additionalInfo.name}</div>
      </div>
      <div className="card__footer">{count}</div>
    </Link>
  );
};

export default Card;
