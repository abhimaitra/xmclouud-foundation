import React, { useState, useEffect } from 'react';
import { layoutService } from 'lib/layout-service';
import { JSX } from 'react';
import { LayoutServiceData } from '@sitecore-jss/sitecore-jss-nextjs';

const LayoutDataTest = (): JSX.Element => {
  const [data, setData] = useState<LayoutServiceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    layoutService
      .fetchLayoutData('/', 'en')
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch layout data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Layout data</h1>
      <pre style={{ maxHeight: '400px', overflow: 'scroll' }}>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default LayoutDataTest;
