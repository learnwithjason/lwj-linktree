import styles from './links.module.css';

type Link = {
  label: string;
  url: string;
};

const LINKS: Link[] = [
  {
    label: 'Twitter',
    url: 'https://twitter.com/LWJShow',
  },
  {
    label: 'Learn With Jason',
    url: 'https://www.learnwithjason.dev',
  },
  {
    label: 'YouTube',
    url: 'https://www.youtube.com/channel/UCnty0z0pNRDgnuoirYXnC5A',
  },
  {
    label: 'Twitch',
    url: 'https://twitch.com/jlengstorf',
  },
];

export function Links() {
  return (
    <nav className={styles.links}>
      {LINKS.map((link) => (
        <a key={link.url} href={link.url} className={styles.link}>
          {link.label}
        </a>
      ))}
    </nav>
  );
}
