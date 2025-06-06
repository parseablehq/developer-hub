"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ContentCopy as ContentCopyIcon,
  Check as CheckIcon,
  RocketLaunch as RocketLaunchIcon,
  Input as InputIcon,
  ManageSearch as ManageSearchIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  CloudUpload as CloudUploadIcon,
  Code as CodeIcon,
  ArrowForward as ArrowForwardIcon,
  CloudQueue as CloudQueueIcon,
  Storage as StorageIcon,
} from "@mui/icons-material";

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  const installCommand = "curl -fsSL https://logg.ing/install | bash";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="flex-1 bg-[#F5F5F5] text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <section className="py-16 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl sm:text-4xl font-bold dark:text-white leading-tight mb-6">
            Welcome to Parseable Documentation
          </h1>
          <p className="text-lg dark:text-slate-300 text-slate-500 mb-10 max-w-3xl mx-auto">
            Parseable is a unified observability platform. It is built to handle
            large volumes of O11Y data, with a focus on efficient data
            ingestion, storage and fast querying.
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white dark:bg-slate-800 rounded-lg overflow-hidden">
              <code className="flex-1 px-4 py-3 text-black dark:text-slate-200 text-sm sm:text-base overflow-x-auto whitespace-nowrap">
                {installCommand}
              </code>
              <button
                onClick={copyToClipboard}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center"
                aria-label="Copy to clipboard"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-5 h-5 mr-1.5" />
                    <span className="text-sm">Copied!</span>
                  </>
                ) : (
                  <>
                    <ContentCopyIcon className="w-5 h-5 mr-1.5" />
                    <span className="text-sm">Copy</span>
                  </>
                )}
              </button>
            </div>
            <p className="mt-2 text-sm text-slate-400">
              Run this command in your terminal to install Parseable
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold dark:text-white mb-8">
            Explore Documentation
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <RocketLaunchIcon fontSize="inherit" />,
                color: "text-orange-500",
                title: "Getting Started",
                description:
                  "Installation guides, initial setup, and basic configuration for Parseable.",
                links: [
                  {
                    text: "Quick Start Guide",
                    href: "/docs/quickstart/binary",
                  },
                  { text: "Installation Options", href: "/docs/installation" },
                  { text: "Basic Configuration", href: "/docs/architecture" },
                ],
              },
              {
                icon: <InputIcon fontSize="inherit" />,
                color: "text-purple-500",
                title: "Data Ingestion",
                description:
                  "Learn how to send logs from various sources to your Parseable instance.",
                links: [
                  {
                    text: "Fluent Bit Integration",
                    href: "/docs/datasource/log-agents/fluent-bit",
                  },
                  {
                    text: "Vector Setup",
                    href: "/docs/datasource/log-agents/vector",
                  },
                  {
                    text: "API Endpoints",
                    href: "/docs/api/v1/logstream/stream_name/put",
                  },
                ],
              },
              {
                icon: <ManageSearchIcon fontSize="inherit" />,
                color: "text-teal-500",
                title: "Querying & Visualization",
                description:
                  "Master Parseable's query language and integrate with visualization tools.",
                links: [
                  { text: "Query Syntax", href: "/docs/key-concepts/query" },
                  {
                    text: "Grafana Integration",
                    href: "/docs/visualization/grafana",
                  },
                  {
                    text: "Parseable UI Guide",
                    href: "https://www.parseable.com/blog/prism-unified-observability-on-parseable",
                  },
                ],
              },
              {
                icon: <AdminPanelSettingsIcon fontSize="inherit" />,
                color: "text-red-500",
                title: "Administration",
                description:
                  "Manage users, permissions, and system settings for your Parseable deployment.",
                links: [
                  { text: "User Management", href: "/docs/features/rbac" },
                  { text: "Alerts", href: "/docs/features/alerts" },
                  { text: "Monitoring", href: "/docs/features/dashboards" },
                ],
              },
              {
                icon: <CloudUploadIcon fontSize="inherit" />,
                color: "text-blue-500",
                title: "Storage & Archival",
                description:
                  "Configure storage backends and manage data retention policies.",
                links: [
                  { text: "S3 Configuration", href: "/docs/storage/awss3" },
                  {
                    text: "Azure Setup",
                    href: "/docs/cloud-provider/azure/api-service",
                  },
                  {
                    text: "Retention Policies",
                    href: "/docs/features/retention",
                  },
                ],
              },
              {
                icon: <CodeIcon fontSize="inherit" />,
                color: "text-green-500",
                title: "API Reference",
                description:
                  "Comprehensive API documentation for integrating with Parseable programmatically.",
                links: [
                  { text: "Authentication", href: "/docs/api#authentication" },
                  { text: "Ingestion API", href: "/docs/api#log-ingestion" },
                  { text: "Query API", href: "/docs/api#query-api" },
                ],
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-lg p-6 hover:bg-slate-750 transition-colors"
              >
                <div
                  className={`${card.color} mb-3`}
                  style={{ fontSize: "2.25rem" }}
                >
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-slate-400 mb-4">{card.description}</p>
                <ul className="space-y-2">
                  {card.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                      >
                        <span className="mr-1" style={{ fontSize: "0.875rem" }}>
                          <ArrowForwardIcon fontSize="inherit" />
                        </span>{" "}
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold dark:text-white mb-8">
            Explore Parseable Editions
          </h2>
          <p className="dark:text-slate-300 text-slate-500 mb-10 text-lg max-w-4xl">
            Parseable offers flexible editions to suit your specific telemetry
            data management and observability requirements, from open-source
            flexibility to enterprise-grade scalability and support.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-shadow">
              <div className="flex items-center mb-4">
                <div
                  className="text-blue-500 mr-4"
                  style={{ fontSize: "2.25rem" }}
                >
                  <CloudQueueIcon fontSize="inherit" />
                </div>
                <h3 className="text-2xl font-semibold text-black dark:text-white">
                  Parseable Enterprise
                </h3>
              </div>
              <p className="text-slate-400 mb-6 text-sm">
                Scalable, secure, and supported telemetry data management for
                demanding production environments. Includes advanced features,
                dedicated support, and SLAs.
              </p>
              <Link
                href="/docs/enterprise"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 hover:underline transition-colors font-medium"
              >
                Learn about Enterprise{" "}
                <span className="ml-1" style={{ fontSize: "0.875rem" }}>
                  <ArrowForwardIcon fontSize="inherit" />
                </span>
              </Link>
            </div>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg hover:shadow-green-500/30 transition-shadow">
              <div className="flex items-center mb-4">
                <div
                  className="text-green-500 mr-4"
                  style={{ fontSize: "2.25rem" }}
                >
                  <StorageIcon fontSize="inherit" />
                </div>
                <h3 className="text-2xl font-semibold dark:text-white text-black">
                  Parseable OSS
                </h3>
              </div>
              <p className="text-slate-400 mb-6 text-sm">
                The powerful open-source core of Parseable. Perfect for getting
                started, development, and smaller deployments.
                Community-supported.
              </p>
              <Link
                href="https://github.com/parseablehq/parseable"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 hover:underline transition-colors font-medium"
              >
                Learn about OSS{" "}
                <span className="ml-1" style={{ fontSize: "0.875rem" }}>
                  <ArrowForwardIcon fontSize="inherit" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 dark:bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold dark:text-white mb-8">
            Need Help?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold dark:text-white mb-2 text-black">
                Community Forums
              </h3>
              <p className="text-slate-400 mb-4 text-sm">
                Ask questions, share your knowledge, and connect with other
                Parseable users.
              </p>
              <Link
                href="https://logg.ing/community"
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors text-sm"
              >
                Visit the Forums
              </Link>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold dark:text-white mb-2 text-black">
                Enterprise Support
              </h3>
              <p className="text-slate-400 mb-4 text-sm">
                Parseable Enterprise customers can access dedicated support
                channels.
              </p>
              <Link
                href="mailto:sales@parseable.com"
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors text-sm"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-800 border-t border-slate-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
            <div>
              <h5 className="text-white font-semibold mb-3">Editions</h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://www.parseable.com/blog/announcing-parseable-20"
                    className="text-slate-400 hover:text-slate-200 transition-colors text-sm"
                  >
                    Parseable Enterprise
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className="text-slate-400 hover:text-slate-200 transition-colors text-sm"
                  >
                    Parseable OSS
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.parseable.com/pricing"
                    className="text-slate-400 hover:text-slate-200 transition-colors text-sm"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">Resources</h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/docs"
                    className="text-slate-400 hover:text-slate-200 transition-colors text-sm"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.parseable.com/blog"
                    className="text-slate-400 hover:text-slate-200 transition-colors text-sm"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://logg.ing/community"
                    className="text-slate-400 hover:text-slate-200 transition-colors text-sm"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/parseablehq/parseable"
                    className="text-slate-400 hover:text-slate-200 transition-colors text-sm"
                  >
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">Company</h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://www.parseable.com/about"
                    className="text-slate-400 hover:text-slate-200 transition-colors text-sm"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:sales@parseable.com"
                    className="text-slate-400 hover:text-slate-200 transition-colors text-sm"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-3">Legal</h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://github.com/parseablehq/parseable/blob/main/LICENSE"
                    className="text-slate-400 hover:text-slate-200 transition-colors text-sm"
                  >
                    License (OSS)
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <h5 className="text-white font-semibold mb-3">Stay Updated</h5>
              <p className="text-slate-400 text-sm mb-3">
                Get the latest news and updates from Parseable.
              </p>
              <form className="flex">
                <input
                  className="bg-slate-700 text-slate-300 placeholder-slate-500 px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow text-sm"
                  placeholder="Enter your email"
                  type="email"
                />
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md text-sm font-medium transition-colors"
                  type="submit"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-blue-500 font-bold text-xl mr-2">P</span>
              <span className="text-slate-400 text-sm">
                © {new Date().getFullYear()} Parseable. All rights reserved.
              </span>
            </div>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/parseablehq"
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="https://x.com/parseablehq"
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link
                href="https://www.linkedin.com/company/parseable"
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
