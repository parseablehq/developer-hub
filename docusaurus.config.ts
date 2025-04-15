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
    image: 'img/parseable-social-card.jpg',
    navbar: {
      title: '',
      logo: {
        alt: 'Parseable Logo',
        src: 'img/parseable-logo.svg',
        srcDark: 'img/parseable-logo.svg',
        width: 60,
        height: 60,
      },
      items: [
        {
          type: 'dropdown',
          label: 'Documentation',
          position: 'left',
          items: [
            {
              label: 'Introduction',
              to: '/docs/introduction',
            },
            {
              label: 'Installation',
              to: '/docs/installation',
            },
            {
              label: 'Concepts',
              to: '/docs/concepts',
            },
            {
              label: 'Log Ingestion',
              to: '/docs/log-ingestion',
            },
            {
              label: 'Integrations',
              to: '/docs/integrations',
            },
          ],
        },
        {
          to: '/docs/get-started',
          label: 'Quick Start',
          position: 'left',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left'
        },
        {
          href: 'https://github.com/parseablehq/developer-hub',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://discord.gg/parseable',
          label: 'Community',
          position: 'right',
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
              to: '/docs/get-started',
            },
            {
              label: 'Installation',
              to: '/docs/installation',
            },
            {
              label: 'Concepts',
              to: '/docs/concepts',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/parseable',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/parseableio',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/parseablehq/developer-hub',
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
