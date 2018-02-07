import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'redux-first-router-link';
import links from 'manifests/links.json';
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
  };

  render() {
    const {
      color,
      panelColor,
    } = this.props;
    return (
      <nav className={styles.nav} style={{ backgroundColor: panelColor }}>
        <ul className={styles.list}>
          {Object.keys(links).map(key => (
            <li
              key={key}
              className={styles.listItem}
            >
              <NavLink
                to={links[key].to}
                exact={links[key].exact}
                className={styles.link}
                activeClassName={styles.active}
                style={{ color }}
              >
                {key}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default component;
