import Link from "next/link";
import { useState } from "react";
import {
  ContentCopy as ContentCopyIcon,
  Check as CheckIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";
import { usePlatform } from "./hooks/usePlatform";

export default function MainPage() {
  const [copied, setCopied] = useState(false);
  const platform = usePlatform();
  const installCommand =
    platform === "windows"
      ? 'powershell -ep bypass -c "irm https://logg.ing/install-windows | iex"'
      : "curl -fsSL https://logg.ing/install | bash";
  const baseUrl =
    process.env.NEXT_PUBLIC_ENV === "development" ? "/" : "/docs/";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="flex-1 bg-[#F8F9FA] dark:bg-[#101622] text-slate-900 dark:text-white overflow-x-hidden font-[Inter,sans-serif]">
      {/* Hero Section */}
      <div className="pt-16 sm:pt-24"></div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1088px] space-y-16">
        {/* Get Started Section */}
        <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Get Started with Parseable
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Ready to dive in? Sign up for our cloud offering or download the
            self-hosted version to get started in minutes.
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white dark:bg-slate-800 rounded-lg overflow-hidden">
              <code className="flex-1 px-4 py-3 text-black dark:text-slate-200 text-sm sm:text-base overflow-x-auto whitespace-nowrap">
                {installCommand}
              </code>
              <button
                onClick={copyToClipboard}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center"
                aria-label="Copy to clipboard"
              >
                {copied ? <CheckIcon /> : <ContentCopyIcon />}
              </button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
            <Link
              href="https://cloud.parseable.com"
              className="flex min-w-[84px] w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 bg-blue-600 text-white text-base font-semibold leading-normal tracking-[-0.01em] hover:bg-blue-700 transition-colors"
            >
              <CloudUploadIcon className="mr-2" />
              <span className="truncate">Sign up now</span>
            </Link>
            <Link
              href={`${baseUrl}installation`}
              className="flex min-w-[84px] w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-base font-semibold leading-normal tracking-[-0.01em] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <svg
                className="mr-2 w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <span className="truncate">Download now</span>
            </Link>
          </div>
        </section>

        <div className="h-px bg-slate-200 dark:bg-slate-800"></div>

        {/* Core Concepts Section */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
            Core Concepts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                icon: "architecture",
                title: "Architecture",
                href: `${baseUrl}architecture`,
              },
              {
                icon: "design_services",
                title: "Design Choices",
                href: `${baseUrl}design-choices`,
              },
              {
                icon: "database",
                title: "Data Modelling",
                href: `${baseUrl}key-concepts/data-model`,
              },
              {
                icon: "input",
                title: "Ingestion",
                href: `${baseUrl}datasource`,
              },
              {
                icon: "query_stats",
                title: "Query",
                href: `${baseUrl}key-concepts/query`,
              },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="group flex flex-col items-center justify-center text-center gap-3 p-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#5A43F5] dark:hover:border-[#5A43F5]/70 hover:shadow-lg transition-all h-32"
              >
                <span className="material-symbols-outlined text-[#5A43F5] text-3xl font-light">
                  {item.icon}
                </span>
                <h3 className="text-slate-900 dark:text-white text-sm font-semibold">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        <div className="h-px bg-slate-200 dark:bg-slate-800"></div>

        {/* Flavours Section */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
            Flavours
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Link
              href="https://app.parseable.com"
              className="group relative flex flex-1 flex-col gap-4 rounded-xl border-2 border-transparent bg-violet-50 dark:bg-violet-900/20 p-6 transition-all hover:border-violet-500 hover:shadow-xl overflow-hidden"
            >
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-bl-full bg-violet-200 dark:bg-violet-800/50 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <svg
                  className="w-10 h-10 text-violet-600 dark:text-violet-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
                  />
                </svg>
                <h3 className="mt-4 text-slate-900 dark:text-white text-lg font-semibold leading-tight">
                  Cloud
                </h3>
                <p className="mt-1 text-slate-600 dark:text-slate-400 text-sm font-normal leading-normal">
                  Fully managed, secure, and scalable Parseable service.
                </p>
              </div>
            </Link>

            <Link
              href={`${baseUrl}enterprise`}
              className="group relative flex flex-1 flex-col gap-4 rounded-xl border-2 border-transparent bg-sky-50 dark:bg-sky-900/20 p-6 transition-all hover:border-sky-500 hover:shadow-xl overflow-hidden"
            >
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-sky-200 dark:bg-sky-800/50 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <svg
                  className="w-10 h-10 text-sky-600 dark:text-sky-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                  />
                </svg>
                <h3 className="mt-4 text-slate-900 dark:text-white text-lg font-semibold leading-tight">
                  Managed Enterprise
                </h3>
                <p className="mt-1 text-slate-600 dark:text-slate-400 text-sm font-normal leading-normal">
                  Dedicated infrastructure with enterprise-grade features and
                  support.
                </p>
              </div>
            </Link>

            <Link
              href="https://github.com/parseablehq/parseable"
              className="group relative flex flex-1 flex-col gap-4 rounded-xl border-2 border-transparent bg-emerald-50 dark:bg-emerald-900/20 p-6 transition-all hover:border-emerald-500 hover:shadow-xl overflow-hidden"
            >
              <div className="absolute -bottom-8 -left-2 w-28 h-28 -rotate-45 bg-emerald-200 dark:bg-emerald-800/50 transition-transform group-hover:scale-110"></div>
              <div className="relative z-10">
                <svg
                  className="w-10 h-10 text-emerald-600 dark:text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                  />
                </svg>
                <h3 className="mt-4 text-slate-900 dark:text-white text-lg font-semibold leading-tight">
                  OSS Self-Hosted
                </h3>
                <p className="mt-1 text-slate-600 dark:text-slate-400 text-sm font-normal leading-normal">
                  Deploy and manage Parseable on your own infrastructure.
                </p>
              </div>
            </Link>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-24 border-t border-slate-200 dark:border-slate-800 py-8">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1088px]">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-4">
            <p className="text-slate-500 dark:text-slate-400">
              © 2025 Parseable Inc.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="https://github.com/parseablehq/parseable"
                className="text-slate-500 dark:text-slate-400 hover:text-[#5A43F5] dark:hover:text-white font-medium"
              >
                GitHub
              </Link>
              <Link
                href="https://logg.ing/community"
                className="text-slate-500 dark:text-slate-400 hover:text-[#5A43F5] dark:hover:text-white font-medium"
              >
                Slack
              </Link>
              <Link
                href="mailto:support@parseable.com"
                className="text-slate-500 dark:text-slate-400 hover:text-[#5A43F5] dark:hover:text-white font-medium"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
