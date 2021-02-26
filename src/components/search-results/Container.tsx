import React, { useContext } from 'react';

import { Tabs, Spin } from 'antd';
import { UserList, OrganizationList, EmptyMessage } from 'components';
import { StoreContext } from 'contexts';

const { TabPane } = Tabs;


const SearchResultsContainer = () => {
  const { queryResult, loading, isError } = useContext(StoreContext);

  function countUsers(): number {
    const filter = queryResult!.filter((result: any) => result.type === 'User');
    return filter.length;
  }
  function countOrganizations(): number {
    const filter = queryResult!.filter(
      (result: any) => result.type === 'Organization',
    );
    return filter.length;
  }

  if (loading) return <Spin className="loadingSpinner" />;

  if (isError)
    return (
      <EmptyMessage
        element="😢"
        message="Oops... we could not process your request."
      />
    );

  return (
    <div className="searchResults">
      <Tabs defaultActiveKey="1">
        <TabPane tab={`USERS (${countUsers()})`} key="1">
          <UserList />
        </TabPane>
        <TabPane tab={`COMPANIES (${countOrganizations()})`} key="2">
          <OrganizationList />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SearchResultsContainer;
