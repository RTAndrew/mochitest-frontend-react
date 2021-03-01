import { Spin, Tabs } from 'antd';
import { EmptyMessage, OrganizationList, UserList } from 'components';
import { StoreContext } from 'contexts';
import React, { useContext, useEffect, useState } from 'react';

const { TabPane } = Tabs;

const SearchResultsContainer = () => {
  const { queryResult, loading, isError } = useContext(StoreContext);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  function countUsers(): number {
    const filter = queryResult!.items.filter(result => result.type === 'User');
    return filter.length;
  }
  function countOrganizations(): number {
    const filter = queryResult!.items.filter(result => result.type === 'Organization');
    return filter.length;
  }

  if (loading) return <Spin className="loadingSpinner" />;

  if (isError)
    return <EmptyMessage element="😢" message="Oops... we could not process your request." />;

  return (
    <div className="searchResults">
      {size.width <= 768 ? (
        <div className="searchResults--mobile">
          <Tabs defaultActiveKey="1">
            <TabPane tab={`USERS (${countUsers()})`} key="1">
              <UserList />
            </TabPane>
            <TabPane tab={`COMPANIES (${countOrganizations()})`} key="2">
              <OrganizationList />
            </TabPane>
          </Tabs>
        </div>
      ) : (
        <div className="searchResults--desktop">
          <div className="searchResults--desktop__list">
            <div className="searchResults--desktop__items">
              <div className="searchResults--desktop__header">{`USERS (${countUsers()})`}</div>
              <div className="searchResults--desktop__body">
                <UserList />
              </div>
            </div>

            <div className="searchResults--desktop__items">
              <div className="searchResults--desktop__header">
                {`COMPANIES (${countOrganizations()})`}
              </div>
              <div className="searchResults--desktop__body">
                <OrganizationList />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsContainer;
