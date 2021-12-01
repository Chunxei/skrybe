import React from 'react';
import styles from './footer.module.scss';

function Footer(): JSX.Element {
  return (
    <footer className={styles.footer}>
      <p>
        Source:{' '}
        <a href="https://github.com/Chunxei/skrybe" target="_blank" rel="noopener noreferrer">
          Chunxei&apos;s github
        </a>
      </p>
    </footer>
  );
}

export default Footer;
