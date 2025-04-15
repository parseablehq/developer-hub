import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Logs to Insights in Minutes',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Deploy Parseable across cloud providers, data centres or edge infrastructure with minimal effort. 
        Ingest logs, metrics and traces from any agent and start extracting value from this data in minutes.
      </>
    ),
  },
  {
    title: 'AI Native',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Integrate Parseable with your AI infrastructure to summarize logs, build play books, 
        prioritize alerts and much more.
      </>
    ),
  },
  {
    title: '90% Faster Query Performance',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Parseable is up to 90% faster than Elastic for analytical queries. 
        This allows faster alerting, incident response and resolution.
      </>
    ),
  },
  {
    title: '70% Less CPU & Memory, 80% Compression',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        With Rust based, index free design Parseable uses 70% less CPU & Memory than traditional 
        JVM based systems and up to 80% compression of data. All leading to significant cost savings.
      </>
    ),
  },
  {
    title: 'Free as in Freedom',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Parseable is open source and uses open standards for data access, storage and even 
        the underlying data format. You are in control of your data, Always!
      </>
    ),
  },
  {
    title: 'Plug into 100+ Ecosystem Tools',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Integrate Parseable with a wide range of big data, observability, alerting, incident management, 
        visualization and AI tools. Additionally, with well documented API, it is trivial to build custom integrations.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
