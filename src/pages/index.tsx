import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HeroSection() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
            <p className={styles.heroDescription}>
              Parseable is built for fast observability on object storage systems like S3: 
              deploy anywhere in minutes, 10x cheaper, extremely scalable and built with open standards.
            </p>
            <div className={styles.buttons}>
              <Link
                className="button button--primary button--lg"
                to="/docs/introduction">
                Get Started
              </Link>
              <Link
                className="button button--secondary button--lg"
                to="https://github.com/parseablehq/parseable">
                GitHub
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src="/img/parseable-logo.svg" alt="Parseable" />
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
};

function CardSection({title, description, link, linkText}: CardSectionProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
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
        <div className={styles.cardGrid}>
          <CardSection
            title="Installation"
            description="Deploy Parseable across cloud providers, data centers, or edge infrastructure with minimal effort."
            link="/docs/installation"
            linkText="Install Parseable"
          />
          <CardSection
            title="Log Ingestion"
            description="Ingest logs, metrics, and traces from any agent and extract value in minutes."
            link="/docs/log-ingestion"
            linkText="Start ingesting"
          />
          <CardSection
            title="Query & Analysis"
            description="Query your observability data using familiar SQL syntax with up to 90% faster performance."
            link="/docs/concepts/query"
            linkText="Learn to query"
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
        <div className={styles.cardGrid}>
          <CardSection
            title="Key Concepts"
            description="Learn the key concepts of Parseable and how they work together."
            link="/docs/concepts"
          />
          <CardSection
            title="Integrations"
            description="Connect Parseable with 100+ data and observability ecosystem tools."
            link="/docs/integrations"
          />
          <CardSection
            title="Use Cases"
            description="Discover how organizations use Parseable for their observability needs."
            link="/docs/introduction#use-cases"
          />
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
        <LearnMoreSection />
      </main>
    </Layout>
  );
}
