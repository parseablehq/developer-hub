interface LocalVideoProps {
  src: string;
  title: string;
}

export function LocalVideo({ src, title }: LocalVideoProps) {
  return (
    <video
      aria-label={title}
      autoPlay
      className="my-6 h-auto w-full rounded-lg"
      loop
      muted
      playsInline
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support embedded videos.
    </video>
  );
}
