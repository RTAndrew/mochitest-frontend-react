import React from 'react';

import { Card, EmptyMessage, SearchResultsHeader } from 'components';

interface OrganizationListProps {
  data: Array<any>;
}

const OrganizationList = ({ data }: OrganizationListProps) => {
  if (data.length < 1)
    return (
      <EmptyMessage
        element={0}
        message="Hummm... We didn't find any companies"
      />
    );

  return (
    <SearchResultsHeader headerName="Company" description="People">
      {data.map(company => {
        return <Card data={company} />;
      })}
    </SearchResultsHeader>
  );
};

export default OrganizationList;
