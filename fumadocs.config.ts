import { source } from './lib/source';

// Export the source for use in the UI components
export { source };

// Export configuration for the documentation site
export default {
  name: 'Parseable Docs',
  baseUrl: '/docs',
  source,
};
