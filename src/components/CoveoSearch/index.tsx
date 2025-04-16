/** @jsxImportSource react */
import React, { useEffect, useState, useRef } from 'react';
import {
  buildSearchEngine,
  SearchEngine,
  getOrganizationEndpoints,
} from '@coveo/headless';
import '@coveo/atomic';
import styles from './styles.module.css';

// Using a functional approach to avoid TypeScript issues with custom elements
interface CoveoSearchProps {
  organizationId: string;
  apiKey: string;
  initialQuery?: string;
}

const CoveoSearch: React.FC<CoveoSearchProps> = ({ organizationId, apiKey, initialQuery = '' }) => {
  const [engine, setEngine] = useState<SearchEngine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (!organizationId || !apiKey) {
      setError('Missing Coveo credentials. Please provide organizationId and apiKey.');
      setIsLoading(false);
      return;
    }

    try {
      const endpoints = getOrganizationEndpoints(organizationId);
      
      const searchEngine = buildSearchEngine({
        configuration: {
          organizationId,
          accessToken: apiKey,
          platformUrl: endpoints.platform,
        },
      });

      setEngine(searchEngine);
      setError(null);
    } catch (err) {
      console.error('Error initializing Coveo search engine:', err);
      setError('Failed to initialize search engine. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  }, [organizationId, apiKey]);

  // Initialize Coveo search interface after the engine is created
  useEffect(() => {
    if (!engine || !searchContainerRef.current) return;

    try {
      // Clear previous content
      while (searchContainerRef.current.firstChild) {
        searchContainerRef.current.removeChild(searchContainerRef.current.firstChild);
      }

      // Create search interface using DOM methods instead of JSX for custom elements
      const searchInterface = document.createElement('atomic-search-interface');
      // Use a unique ID for the engine
      const engineId = `coveo-engine-${Date.now()}`;
      searchInterface.setAttribute('engine-id', engineId);
      searchInterface.setAttribute('fields-to-include', 'title,excerpt,uri,author,date,filetype,source');
      searchInterface.setAttribute('pipeline', 'default');
      searchInterface.className = styles.searchInterface;

      const searchDiv = document.createElement('div');
      searchDiv.className = styles.atomicSearch;

      const searchBox = document.createElement('atomic-search-box');
      // Set the initial query if provided
      if (searchQuery) {
        searchBox.setAttribute('default-text', searchQuery);
      }
      searchBox.className = styles.searchBox;
      searchDiv.appendChild(searchBox);

      const searchLayout = document.createElement('atomic-search-layout');
      searchLayout.className = styles.searchLayout;
      
      // Facets section
      const facetsSection = document.createElement('atomic-layout-section');
      facetsSection.setAttribute('section', 'facets');
      facetsSection.className = styles.facetsSection;
      
      const sourceFacet = document.createElement('atomic-facet');
      sourceFacet.setAttribute('field', 'source');
      sourceFacet.setAttribute('label', 'Source');
      facetsSection.appendChild(sourceFacet);
      
      const filetypeFacet = document.createElement('atomic-facet');
      filetypeFacet.setAttribute('field', 'filetype');
      filetypeFacet.setAttribute('label', 'File Type');
      facetsSection.appendChild(filetypeFacet);

      const dateFacet = document.createElement('atomic-timeframe-facet');
      dateFacet.setAttribute('field', 'date');
      dateFacet.setAttribute('label', 'Date');
      facetsSection.appendChild(dateFacet);
      
      searchLayout.appendChild(facetsSection);
      
      // Main section
      const mainSection = document.createElement('atomic-layout-section');
      mainSection.setAttribute('section', 'main');
      mainSection.className = styles.mainSection;
      
      // Add search summary and sort components
      const summaryAndSortContainer = document.createElement('div');
      summaryAndSortContainer.className = styles.summaryAndSortContainer;
      
      const querySummary = document.createElement('atomic-query-summary');
      querySummary.className = styles.querySummary;
      summaryAndSortContainer.appendChild(querySummary);
      
      const sortDropdown = document.createElement('atomic-sort-dropdown');
      sortDropdown.className = styles.sortDropdown;
      summaryAndSortContainer.appendChild(sortDropdown);
      
      mainSection.appendChild(summaryAndSortContainer);
      
      // Result list
      const resultList = document.createElement('atomic-result-list');
      resultList.className = styles.resultList;
      const resultTemplate = document.createElement('atomic-result-template');
      const template = document.createElement('template');
      
      // Create a better result template
      template.innerHTML = `
        <style>
          .result-item {
            padding: 1rem;
            margin-bottom: 1rem;
            border: 1px solid var(--ifm-color-emphasis-200);
            border-radius: 8px;
            transition: all 0.2s ease;
          }
          .result-item:hover {
            border-color: var(--ifm-color-primary);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .result-title {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
            color: var(--ifm-color-primary);
          }
          .result-excerpt {
            margin-bottom: 0.5rem;
            color: var(--ifm-color-emphasis-700);
          }
          .result-metadata {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            font-size: 0.8rem;
            color: var(--ifm-color-emphasis-600);
          }
          .result-metadata-item {
            display: flex;
            align-items: center;
            gap: 0.25rem;
          }
        </style>
        <div class="result-item">
          <div class="result-title">
            <atomic-result-link></atomic-result-link>
          </div>
          <div class="result-excerpt">
            <atomic-result-text field="excerpt"></atomic-result-text>
          </div>
          <div class="result-metadata">
            <div class="result-metadata-item">
              <atomic-result-icon></atomic-result-icon>
              <atomic-result-text field="filetype"></atomic-result-text>
            </div>
            <div class="result-metadata-item">
              <atomic-result-date></atomic-result-date>
            </div>
            <div class="result-metadata-item">
              <atomic-result-printable-uri></atomic-result-printable-uri>
            </div>
          </div>
        </div>
      `;
      
      resultTemplate.appendChild(template);
      resultList.appendChild(resultTemplate);
      
      mainSection.appendChild(resultList);
      
      // Add pager
      const pager = document.createElement('atomic-pager');
      pager.className = styles.pager;
      mainSection.appendChild(pager);
      
      searchLayout.appendChild(mainSection);
      searchDiv.appendChild(searchLayout);
      
      searchInterface.appendChild(searchDiv);
      searchContainerRef.current.appendChild(searchInterface);

      // Execute search if there's an initial query
      if (searchQuery) {
        setTimeout(() => {
          const event = new CustomEvent('atomic/search');
          searchInterface.dispatchEvent(event);
        }, 500);
      }
    } catch (err) {
      console.error('Error setting up Coveo search interface:', err);
      setError('Failed to set up search interface.');
    }
  }, [engine, searchQuery]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading search...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h3>Search Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.searchContainer} ref={searchContainerRef}></div>
  );
};

export default CoveoSearch;
