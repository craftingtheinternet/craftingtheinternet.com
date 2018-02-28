import * as React from "react";
import { connect } from "react-redux";
import { NavLink } from "redux-first-router-link";

import { ActionCreatorType, close } from "actions/sidebar";

import * as links from "manifests/links.json";
import { contentClassName } from "manifests/sidebar.json";

import * as styles from "./styles.styl";

interface Props {
  closeSidebar: ActionCreatorType;
  color?: string;
  panelColor?: string;
}

class ReactComponent extends React.PureComponent<Props> {
  public static displayName = "MobileNavigation";
  public static defaultProps = {
    color: "black",
    panelColor: "transparent"
  };

  public render() {
    const { color, panelColor } = this.props;
    return (
      <nav className={styles.nav} style={{ backgroundColor: panelColor }}>
        <div
          className={styles.list}
          style={{ maxHeight: `${Object.keys(links).length * 2.5}rem` }}
        >
          {Object.keys(links).map(
            key =>
              links[key].available ? (
                <NavLink
                  key={key}
                  to={links[key].to}
                  exact={links[key].exact}
                  className={styles.link}
                  activeClassName={styles.active}
                  style={{ color }}
                  onClick={this.onLinkClick}
                >
                  {key}
                </NavLink>
              ) : (
                <span
                  key={key}
                  className={[styles.link, styles.strikethrough].join(" ")}
                  style={{ color }}
                >
                  {key}
                </span>
              )
          )}
        </div>
      </nav>
    );
  }

  private onLinkClick = () => {
    const { closeSidebar } = this.props;
    const container = document.querySelector(`.${contentClassName}`);
    if (container) {
      requestAnimationFrame(() => {
        container.scrollTop = 0;
        closeSidebar();
      });
    } else {
      closeSidebar();
    }
  };
}

const mapDispatchToProps = {
  closeSidebar: close
};

export { ReactComponent };

export default connect(null, mapDispatchToProps)(ReactComponent);
