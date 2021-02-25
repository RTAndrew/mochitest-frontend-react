import React from 'react';

import { Card, EmptyMessage, SearchResultsHeader } from 'components';

interface UserListProps {
  data: Array<any>;
}

const UserList = ({ data }: UserListProps) => {
  if (data.length < 1)
    return (
      <EmptyMessage element={0} message="Hummm... We didn't find any users" />
    );

  return (
    <SearchResultsHeader headerName="User" description="Contribuitions">
      {data.map(user => {
        return <Card data={user} />;
      })}
    </SearchResultsHeader>
  );
};

export default UserList;
