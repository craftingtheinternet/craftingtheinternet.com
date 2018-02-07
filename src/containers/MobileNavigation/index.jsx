import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'redux-first-router-link';
import links from 'manifests/links.json';
import { contentClassName } from 'manifests/sidebar.json';
import * as sidebarActions from 'actions/sidebar';
import styles from './styles.styl';

class component extends PureComponent {
  static displayName = 'Navigation';
  static defaultProps = {
    color: 'black',
    panelColor: 'transparent',
  };
  static propTypes = {
    color: PropTypes.string,
    panelColor: PropTypes.string,
    closeSidebar: PropTypes.func.isRequired,
  };

  onLinkClick = () => {
    const { closeSidebar } = this.props;
    const container = document.querySelector(`.${contentClassName}`);
    if (container) {
      container.scrollTop = 0;
    }
    if (requestIdleCallback) {
      requestIdleCallback(() => {
        closeSidebar();
      });
    } else {
      closeSidebar();
    }
  }

  render() {
    const {
      color,
      panelColor,
    } = this.props;
    return (
      <nav className={styles.nav} style={{ backgroundColor: panelColor }}>
        <div
          className={styles.list}
          style={{ maxHeight: `${Object.keys(links).length * 3}rem` }}
        >
          {Object.keys(links).map(key => (
            <NavLink
              to={links[key].to}
              exact={links[key].exact}
              className={styles.link}
              activeClassName={styles.active}
              style={{ color }}
              onClick={this.onLinkClick}
            >
              {key}
            </NavLink>
          ))}
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = {
  closeSidebar: sidebarActions.close,
};

export { component };

export default connect(null, mapDispatchToProps)(component);
