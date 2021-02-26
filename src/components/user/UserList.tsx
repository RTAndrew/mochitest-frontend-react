import { Card, EmptyMessage, SearchResultsHeader } from 'components';
import { StoreContext } from 'contexts';
import React, { useContext } from 'react';

const UserList = () => {
  const { queryResult } = useContext(StoreContext);

  const userList = queryResult!.filter((result: any) => result.type === 'User');

  if (userList.length < 1)
    return <EmptyMessage element={0} message="Hummm... We didn't find any users..." />;

  return (
    <SearchResultsHeader headerName="User" description="Contribuitions">
      {userList.map(user => {
        return <Card key={user.id} data={user} />;
      })}
    </SearchResultsHeader>
  );
};

export default UserList;
