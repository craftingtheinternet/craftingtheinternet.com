import * as React from "react";

import { ToggleType } from "actions/sidebar";

import styles from "./styles.styl";

export interface Props {
  sidebarOpen?: boolean;
  toggleSidebar: ToggleType;
}

const component: React.SFC<Props> = ({ sidebarOpen, toggleSidebar }) => {
  const onClick = () => toggleSidebar(!sidebarOpen);
  return (
    <button
      className={[styles.hamburgerMenu, sidebarOpen ? styles.open : ""].join(
        " "
      )}
      onClick={onClick}
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
};

component.displayName = "HamburgerMenu";

export default component;
