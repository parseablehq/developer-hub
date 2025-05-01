import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { FaGithub, FaSlack, FaTwitter, FaReddit } from 'react-icons/fa';

import styles from './index.module.css';

function HeroSection() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText('curl -sSf https://get.parseable.com | sh');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className={styles.heroTitle}>
              Parseable Documentation
            </Heading>
            <p className={styles.heroDescription}>
              Learn how to set up fast observability on object store using Parseable
            </p>
            <div className={styles.commandBox}>
              <code>curl -sSf https://get.parseable.com | sh</code>
              <button 
                className={styles.copyButton} 
                onClick={copyToClipboard}
                aria-label="Copy to clipboard"
              >
                {copied ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                )}
              </button>
            </div>
            <div className={styles.heroButtons}>
              <Link to="/docs/introduction" className={styles.heroButton}>
                Read Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

type CardSectionProps = {
  title: string;
  description: string;
  link: string;
  linkText?: string;
  icon?: React.ReactNode;
};

function CardSection({title, description, link, linkText, icon}: CardSectionProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        {icon && <div className={styles.cardIcon}>{icon}</div>}
        <Heading as="h3" className={styles.cardTitle}>
          {title}
        </Heading>
        <p className={styles.cardDescription}>{description}</p>
      </div>
      <div className={styles.cardFooter}>
        <Link className={styles.cardLink} to={link}>
          {linkText || 'Learn more'} →
        </Link>
      </div>
    </div>
  );
}

function InstallationOptionsSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Installation Options
        </Heading>
        <div className={styles.sectionDescription}>
          <p>Choose the deployment method that works best for your environment</p>
        </div>
        <div className={styles.installationCards}>
          <div className={styles.installationCard}>
            <div className={styles.installationCardIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2H3v16h5v4l4-4h5l4-4V2zM12 10v.01M8 10v.01M16 10v.01"></path>
              </svg>
            </div>
            <h3>Docker</h3>
            <p>Deploy Parseable quickly with Docker using our pre-built images from Docker Hub.</p>
            <Link to="/docs/admin-guide/installation/standalone/docker" className={styles.installationCardLink}>
              View Docker Guide
            </Link>
          </div>
          <div className={styles.installationCard}>
            <div className={styles.installationCardIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v16M4 8l16 8M4 16l16-8"></path>
              </svg>
            </div>
            <h3>Kubernetes</h3>
            <p>Run Parseable in your Kubernetes cluster using our Helm chart or operator.</p>
            <Link to="/docs/admin-guide/installation/standalone/k8s" className={styles.installationCardLink}>
              View Kubernetes Guide
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Features
        </Heading>
        <div className={styles.sectionDescription}>
          <p>Discover what makes Parseable the best choice for log analytics</p>
        </div>
        <div className={styles.cardGrid}>
          <CardSection
            title="Log Ingestion"
            description="Fast and efficient log ingestion from various sources with support for multiple protocols and formats."
            link="/docs/key-concepts/ingestion"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"></path>
              </svg>
            }
          />
          <CardSection
            title="Visualization & Query"
            description="Powerful query interface with real-time data exploration and visualization capabilities."
            link="/docs/key-concepts/query"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M7 12h10"></path>
                <path d="M10 18h4"></path>
              </svg>
            }
          />
          <CardSection
            title="Alerting"
            description="Set up real-time alerts with customizable triggers and notification channels."
            link="/docs/features/alerts"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            }
          />
          <CardSection
            title="LLMS"
            description="Built-in language model processing for advanced log analysis and pattern recognition."
            link="/docs/docs/features/llms"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
            }
          />
          <CardSection
            title="Storage"
            description="Efficient log storage with optimized compression and retention policies."
            link="/docs/category/storage"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 20h20"></path>
                <path d="M5 20V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"></path>
              </svg>
            }
          />
          <CardSection
            title="OTEL"
            description="Full OpenTelemetry compatibility for seamless integration with modern observability stacks."
            link="/docs/category/opentelemetry"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="M7.5 12.5 3 3 8.5 8"></path>
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Join Our Community
        </Heading>
        <div className={styles.sectionDescription}>
          <p>Connect with other users and get support from the Parseable team</p>
        </div>
        <div className={styles.communityCards}>
          <a href="https://github.com/parseablehq/parseable" className={styles.communityCard}>
            <div className={styles.communityCardIcon}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </div>
            <h3>GitHub</h3>
            <p>Star us on GitHub and contribute to the project</p>
          </a>
          <a href="https://logg.ing/community" className={styles.communityCard}>
            <div className={styles.communityCardIcon}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.687 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.687a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.522h-6.313z"/>
              </svg>
            </div>
            <h3>Slack</h3>
            <p>Join our Slack community for real-time discussions</p>
          </a>
          <a href="https://twitter.com/parseablehq" className={styles.communityCard}>
            <div className={styles.communityCardIcon}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </div>
            <h3>Twitter</h3>
            <p>Follow us for the latest updates and announcements</p>
          </a>
          <a href="https://www.reddit.com/r/parseable/" className={styles.communityCard}>
            <div className={styles.communityCardIcon}>
              <FaReddit size={24} />
            </div>
            <h3>Reddit</h3>
            <p>Engage with the community on Reddit</p>
          </a>
        </div>
      </div>
    </section>
  );
}

function IntegrationsSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Integrations
        </Heading>
        <div className={styles.sectionDescription}>
          <p>Connect your systems and start analyzing your data</p>
        </div>

        <div className={styles.integrationCategory}>
          <h3 className={styles.integrationCategoryTitle}>Data Sources</h3>
          <div className={styles.integrationGrid}>
            <div className={styles.integrationItem}>
              <div className={styles.integrationIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <span>Send Traces</span>
              <p>Automatic instrumentation for popular frameworks</p>
            </div>
            <div className={styles.integrationItem}>
              <div className={styles.integrationIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <line x1="10" y1="9" x2="8" y2="9"></line>
                </svg>
              </div>
              <span>Send Logs</span>
              <p>Configure log collection and analysis</p>
            </div>
            <div className={styles.integrationItem}>
              <div className={styles.integrationIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18"></path>
                  <path d="M18 12V8"></path>
                  <path d="M13 12V5"></path>
                  <path d="M8 12v-3"></path>
                </svg>
              </div>
              <span>Send Metrics</span>
              <p>Configure metrics collection and visualization</p>
            </div>
          </div>
          <div className={styles.integrationPlatforms}>
            <div className={styles.platformTag}>
              <span>JavaScript</span>
            </div>
            <div className={styles.platformTag}>
              <span>Python</span>
            </div>
            <div className={styles.platformTag}>
              <span>Kubernetes</span>
            </div>
            <div className={styles.platformTag}>
              <span>Docker</span>
            </div>
            <div className={styles.platformTag}>
              <span>Prometheus</span>
            </div>
            <div className={styles.platformTag}>
              <span>Node.JS</span>
            </div>
          </div>
          <div className={styles.viewAllLink}>
            <Link to="/docs/category/datasource">View all options →</Link>
          </div>
        </div>

        <div className={styles.integrationCategory}>
          <h3 className={styles.integrationCategoryTitle}>Monitoring</h3>
          <div className={styles.integrationGrid}>
            <div className={styles.integrationItem}>
              <div className={styles.integrationIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                  <line x1="6" y1="6" x2="6.01" y2="6"></line>
                  <line x1="6" y1="18" x2="6.01" y2="18"></line>
                </svg>
              </div>
              <span>Infrastructure</span>
              <p>Monitor your infrastructure and resources</p>
            </div>
            <div className={styles.integrationItem}>
              <div className={styles.integrationIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 10h-1.26A8 8 0 0 0 9 20h9a5 5 0 0 0 0-10z"></path>
                </svg>
              </div>
              <span>Cloud Services</span>
              <p>Track your cloud resources and services</p>
            </div>
            <div className={styles.integrationItem}>
              <div className={styles.integrationIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </div>
              <span>Applications</span>
              <p>Monitor specialized services and applications</p>
            </div>
          </div>
          <div className={styles.integrationPlatforms}>
            <div className={styles.platformTag}>
              <span>Docker</span>
            </div>
            <div className={styles.platformTag}>
              <span>Kubernetes</span>
            </div>
            <div className={styles.platformTag}>
              <span>AWS</span>
            </div>
            <div className={styles.platformTag}>
              <span>Azure</span>
            </div>
            <div className={styles.platformTag}>
              <span>Frontend</span>
            </div>
            <div className={styles.platformTag}>
              <span>Terraform</span>
            </div>
          </div>
          <div className={styles.viewAllLink}>
            <Link to="/docs/category/admin-guide">View all options →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Fast observability on S3: deploy anywhere in minutes, 10x cheaper, extremely scalable and built with open standards.">
      <main className={styles.main}>
        <HeroSection />
        <InstallationOptionsSection />
        <FeaturesSection />
        <IntegrationsSection />
        <CommunitySection />
      </main>
    </Layout>
  );
}
