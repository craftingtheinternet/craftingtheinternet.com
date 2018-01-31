import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'redux-first-router-link';
import styles from './styles.styl';

const BAR_WIDTH = 200;

const links = {
  Home: {
    to: '/',
    exact: true,
  },
  About: {
    to: { type: 'ABOUT' },
  },
  Résumé: {
    to: { type: 'RESUME' },
  },
  Portfolio: {
    to: { type: 'PORTFOLIO' },
  },
  Blog: {
    to: { type: 'BLOG' },
  },
  Contact: {
    to: { type: 'CONTACT' },
  },
};

class component extends PureComponent {
  static displayName = 'Navigation';
  static defaultProps = {
    color: 'black',
  };
  static propTypes = {
    color: PropTypes.string,
  };

  constructor() {
    super();
    this.listItems = {};
    this.state = {
      hoveredListItemOffset: null,
      hoveredListItemWidth: null,
      hoveredListItemIsVisible: false,
    };
  }

  onMouseEnter = key => () => {
    if (this.listItems[key]) {
      this.setState(() => ({
        hoveredListItemOffset: this.listItems[key].offsetLeft,
        hoveredListItemWidth: this.listItems[key].clientWidth,
        hoveredListItemIsVisible: true,
      }));
    }
  }

  onMouseLeave = () => {
    this.setState(() => ({
      hoveredListItemIsVisible: false,
    }));
  }

  assignListItem = key => (el) => {
    this.listItems[key] = el;
  }

  render() {
    const { color } = this.props;
    const {
      hoveredListItemOffset,
      hoveredListItemWidth,
      hoveredListItemIsVisible,
    } = this.state;
    return (
      <nav className={styles.nav} onMouseLeave={this.onMouseLeave}>
        <ul className={styles.list}>
          {Object.keys(links).map(key => (
            <li
              key={key}
              className={styles.listItem}
              ref={this.assignListItem(key)}
              onMouseEnter={this.onMouseEnter(key)}
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
        <div
          className={styles.bar}
          style={{
            width: BAR_WIDTH,
            opacity: hoveredListItemIsVisible ? 1 : 0,
            backgroundColor: color,
            transform: `translateX(${hoveredListItemOffset || 0}px) scaleX(${hoveredListItemWidth / BAR_WIDTH})`,
          }}
        />
      </nav>
    );
  }
}

export default component;
