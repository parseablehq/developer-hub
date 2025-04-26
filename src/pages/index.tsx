import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HeroSection() {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className={styles.heroTitle}>
              Parseable Docs
            </Heading>
            <p className={styles.heroDescription}>
              Learn how to monitor and troubleshoot your applications with Parseable using step-by-step guides, 
              reference docs, and video tutorials.
            </p>
            <div className={styles.heroButtons}>
              <Link to="/docs/introduction" className={styles.heroButton}>
                <span className={styles.heroButtonIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </span>
                Quick Start
                <span className={styles.heroButtonSubtext}>Setup Monitoring in Minutes</span>
              </Link>
              <Link to="/docs/installation" className={styles.heroButton}>
                <span className={styles.heroButtonIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
                    <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
                    <line x1="6" x2="6.01" y1="6" y2="6"></line>
                    <line x1="6" x2="6.01" y1="18" y2="18"></line>
                  </svg>
                </span>
                Install Locally
                <span className={styles.heroButtonSubtext}>Get started with self-hosted Parseable</span>
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

function GetStartedSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Get Started
        </Heading>
        <div className={styles.sectionDescription}>
          <p>Start your journey with Parseable in just a few minutes</p>
        </div>
        <div className={styles.cardGrid}>
          <CardSection
            title="Installation"
            description="Deploy Parseable across cloud providers, data centers, or edge infrastructure with minimal effort."
            link="/docs/installation"
            linkText="Install Parseable"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="8" x="2" y="2" rx="2" ry="2"></rect>
                <rect width="20" height="8" x="2" y="14" rx="2" ry="2"></rect>
                <line x1="6" x2="6.01" y1="6" y2="6"></line>
                <line x1="6" x2="6.01" y1="18" y2="18"></line>
              </svg>
            }
          />
          <CardSection
            title="Log Ingestion"
            description="Ingest logs, metrics, and traces from any agent and extract value in minutes."
            link="/docs/key-concepts/ingestion"
            linkText="Start ingesting"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 12h-5"></path>
                <path d="M15 8h-5"></path>
                <path d="M19 17V5a2 2 0 0 0-2-2H4"></path>
                <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"></path>
              </svg>
            }
          />
          <CardSection
            title="Query & Analysis"
            description="Query your observability data using familiar SQL syntax with up to 90% faster performance."
            link="/docs/key-concepts/query"
            linkText="Learn to query"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M7 12h10"></path>
                <path d="M10 18h4"></path>
              </svg>
            }
          />
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
          Key Features
        </Heading>
        <div className={styles.sectionDescription}>
          <p>Discover what makes Parseable the ideal choice for your observability needs</p>
        </div>
        <div className={styles.cardGrid}>
          <CardSection
            title="Fast & Scalable"
            description="Built for high-performance log ingestion and querying with exceptional scalability across distributed environments."
            link="/docs/category/key-concepts"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m13 2-2 2.5L13 7"></path>
                <path d="M10 2h8.5L19 7"></path>
                <path d="m19 22-2-2.5 2-2.5"></path>
                <path d="M5 22h8.5L13 17"></path>
                <path d="M5 7v10"></path>
                <path d="M19 7v10"></path>
              </svg>
            }
          />
          <CardSection
            title="Cost-Effective"
            description="Store observability data on S3-compatible object storage at a fraction of the cost of traditional solutions."
            link="/docs/design-choices#highlights"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                <path d="M12 18V6"></path>
              </svg>
            }
          />
          <CardSection
            title="Open Standards"
            description="Built with open standards and formats, ensuring compatibility and avoiding vendor lock-in."
            link="/docs/category/key-concepts"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="m7.5 12.5 3 3 6-6"></path>
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
}

function LearnMoreSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Learn More
        </Heading>
        <div className={styles.sectionDescription}>
          <p>Explore our documentation and resources to get the most out of Parseable</p>
        </div>
        <div className={styles.cardGrid}>
          <CardSection
            title="Key Concepts"
            description="Learn the key concepts of Parseable and how they work together."
            link="/docs/category/key-concepts"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"></path>
                <path d="M8 11h8"></path>
                <path d="M8 7h6"></path>
              </svg>
            }
          />
          <CardSection
            title="Integrations"
            description="Connect Parseable with 100+ data and observability ecosystem tools."
            link="/docs/category/key-concepts"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3.5 19h17"></path>
                <path d="M14 5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V5Z"></path>
                <path d="M5 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2Z"></path>
                <path d="M10 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"></path>
              </svg>
            }
          />
          <CardSection
            title="Use Cases"
            description="Discover how organizations use Parseable for their observability needs."
            link="/docs/category/key-concepts"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
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
          <a href="https://discord.gg/parseablehq" className={styles.communityCard}>
            <div className={styles.communityCardIcon}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
              </svg>
            </div>
            <h3>Discord</h3>
            <p>Join our Discord server for real-time discussions</p>
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
        <GetStartedSection />
        <FeaturesSection />
        <LearnMoreSection />
        <CommunitySection />
      </main>
    </Layout>
  );
}
