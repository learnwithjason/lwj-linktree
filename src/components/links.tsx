import styles from './links.module.css';

type Link = {
  label: string;
  slug: string;
  url: string;
};

const LINKS: Link[] = [
  {
    label: 'Twitter',
    slug: 'twitter',
    url: 'https://twitter.com/LWJShow',
  },
  {
    label: 'Learn With Jason',
    slug: 'learnwithjason',
    url: 'https://www.learnwithjason.dev',
  },
  {
    label: 'YouTube',
    slug: 'youtube',
    url: 'https://www.youtube.com/channel/UCnty0z0pNRDgnuoirYXnC5A',
  },
  {
    label: 'Twitch',
    slug: 'twitch',
    url: 'https://twitch.com/jlengstorf',
  },
];

export function Links() {
  return (
    <nav className={styles.links}>
      {LINKS.map((link) => (
        <a
          key={link.url}
          href={link.url}
          className={styles.link}
          data-site={link.slug}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
