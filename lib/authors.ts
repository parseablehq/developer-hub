export interface AuthorProfile {
  name: string;
  title?: string;
  avatar?: string; // path in public
  bio?: string;
  twitter?: string;
  github?: string;
}

export const authors: Record<string, AuthorProfile> = {
  nitish: {
    name: 'Nitish Tiwari',
    title: 'Founder, Parseable',
    avatar: '/avatars/generic.svg',
    twitter: 'https://twitter.com/nitish_tiwari',
    github: 'https://github.com/nitish-tiwari',
    bio: 'Logs, Rust and open-source enthusiast.'
  },
};
