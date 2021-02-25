import React from 'react';

import { Tabs, Spin } from 'antd';
import { UserList } from 'components';

const { TabPane } = Tabs;

interface SearchResultsContainerProps {
  loading: boolean;
  results: Array<any>;
}

const SearchResultsContainer = ({
  loading,
  results,
}: SearchResultsContainerProps) => {
  function getUserResults(): Array<any> {
    return results.filter((result: any) => result.type !== 'Organization');
  }
  function getOrganizationResults() {
    return results.filter((result: any) => result.type !== 'User');
  }

  if (loading) return <Spin className="loadingSpinner" />;

  return (
    <div className="searchResults">
      <Tabs defaultActiveKey="1">
        <TabPane tab={`USERS (${getUserResults().length})`} key="1">
          <UserList data={getUserResults()} />
        </TabPane>
        <TabPane tab={`COMPANIES (${getOrganizationResults().length})`} key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SearchResultsContainer;
