import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Parseable Documentation',
  tagline: 'Fast observability on S3',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://www.parseable.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'parseablehq', // Usually your GitHub org/user name.
  projectName: 'developer-hub', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Add scripts for Coveo
  scripts: [
    {
      src: 'https://static.cloud.coveo.com/atomic/v2/atomic.esm.js',
      type: 'module',
    },
  ],
  
  // Make environment variables available to the client
  customFields: {
    coveoOrganizationId: process.env.COVEO_ORGANIZATION_ID,
    coveoApiKey: process.env.COVEO_API_KEY,
  },
  
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/parseablehq/developer-hub/tree/main/docs/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/parseablehq/developer-hub/tree/main/docs/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: '',
      logo: {
        alt: 'Parseable Logo',
        src: 'img/parseable-logo.svg',
        srcDark: 'img/parseable-logo-white.svg',
        width: 75,
        height: 75,
        style: { marginRight: '0', padding: '2px' },
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left'
        },
        {
          href: 'https://demo.parseable.com',
          label: 'Demo',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/docs/introduction',
            },
            {
              label: 'Installation',
              to: '/docs/docs/installation',
            },
            {
              label: 'Concepts',
              to: '/docs/docs/category/key-concepts',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Slack',
              href: 'https://logg.ing/community',
            },
            {
              label: 'Twitter',
              href: 'https://x.com/parseablehq',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/parseablehq/parseable',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Demo',
              href: 'https://demo.parseable.com',
            },
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} Parseable, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
