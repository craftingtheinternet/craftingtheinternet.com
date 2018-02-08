import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.styl';

const component = ({
  sidebarOpen,
  toggleSidebar,
}) => (
  <button
    className={[styles.hamburgerMenu, sidebarOpen ? styles.open : ''].join(' ')}
    onClick={() => toggleSidebar(!sidebarOpen)}
  >
    <span className={styles.hamburgerBap}>
      {[0, 1, 2, 3].map((n, i, l) => (
        <span
          key={n}
          className={styles.hamburgerTopping}
          style={{ top: `${n * (100 / l.length)}%` }}
        />
      ))}
    </span>
  </button>
);

component.displayName = 'HamburgerMenu';
component.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default component;
