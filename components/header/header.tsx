import React from 'react';
import Image from 'next/image';
import styles from './header.module.scss';

function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Image
          src="/images/skrybe-icon.jpeg"
          width="45"
          height="45"
          alt=""
        />
        <h1>Skrybe</h1>
      </div>
    </header>
  );
}

export default Header;
