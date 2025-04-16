import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import CoveoSearch from '@site/src/components/CoveoSearch';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function SearchPage(): React.ReactNode {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const { siteConfig } = useDocusaurusContext();
  const { coveoOrganizationId, coveoApiKey } = siteConfig.customFields as {
    coveoOrganizationId?: string;
    coveoApiKey?: string;
  };

  // Extract search query from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);
  }, [location.search]);

  return (
    <Layout
      title={`Search${searchQuery ? ` - ${searchQuery}` : ''}`}
      description="Search the Parseable documentation"
    >
      <main className="container margin-vert--lg">
        <h1>Search{searchQuery ? `: ${searchQuery}` : ''}</h1>
        {coveoOrganizationId && coveoApiKey ? (
          <CoveoSearch 
            organizationId={coveoOrganizationId}
            apiKey={coveoApiKey}
            initialQuery={searchQuery}
          />
        ) : (
          <div className="alert alert--warning" role="alert">
            <p>
              <strong>Coveo search is not configured.</strong> Please set the COVEO_ORGANIZATION_ID and COVEO_API_KEY 
              environment variables in your .env file.
            </p>
          </div>
        )}
      </main>
    </Layout>
  );
}
