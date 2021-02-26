import { Card, EmptyMessage, SearchResultsHeader } from 'components';
import { StoreContext } from 'contexts';
import React, { useContext } from 'react';

const OrganizationList = () => {
  const { queryResult } = useContext(StoreContext);

  const organizationList = queryResult!.filter((result: any) => result.type === 'Organization');

  if (organizationList.length < 1)
    return <EmptyMessage element={0} message="Hummm... We didn't find any companies..." />;

  return (
    <SearchResultsHeader headerName="Company" description="People">
      {organizationList.map(company => {
        return <Card key={company.id} data={company} />;
      })}
    </SearchResultsHeader>
  );
};

export default OrganizationList;
