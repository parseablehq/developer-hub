interface IntegrationLogoProps {
  /** File name in public/images/integrations, e.g. "grafana.svg" */
  src: string;
  alt: string;
  /** Invert in dark mode, for black monochrome marks */
  mono?: boolean;
}

export function IntegrationLogo({ src, alt, mono }: IntegrationLogoProps) {
  return (
    <img
      src={`/docs/images/integrations/${src}`}
      alt={alt}
      width={20}
      height={20}
      loading="lazy"
      className={`integration-logo size-5 object-contain${mono ? ' dark:invert' : ''}`}
    />
  );
}
