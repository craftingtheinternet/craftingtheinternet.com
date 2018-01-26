import React from 'react';
import styles from 'containers/App/styles.styl';

export default ({ title, text, url }) => (
  <div>
    <div className={styles.more}>{title}</div>

    <a
      className={styles.link}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  </div>
);
