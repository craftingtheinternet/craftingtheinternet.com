import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'redux-first-router-link';
import styles from './styles.styl';

const BAR_SIZE = 200;
const HORIZONTAL = 'horizontal';
const VERTICAL = 'vertical';

const links = {
  About: {
    to: { type: 'ABOUT' },
    exact: true,
  },
  Résumé: {
    to: { type: 'RESUME' },
    exact: true,
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
    orientation: HORIZONTAL,
  };
  static propTypes = {
    color: PropTypes.string,
    orientation: PropTypes.oneOf([HORIZONTAL, VERTICAL]),
  };

  constructor() {
    super();
    this.listItems = {};
    this.state = {
      hoveredListItemOffset: null,
      hoveredListItemSize: null,
      hoveredListItemIsVisible: false,
    };
  }

  onMouseEnter = key => () => {
    const { orientation } = this.props;
    const offsetDimension = orientation === HORIZONTAL ? 'Left' : 'Top';
    const sizeDimension = orientation === HORIZONTAL ? 'Width' : 'Height';
    if (this.listItems[key]) {
      this.setState(() => ({
        hoveredListItemOffset: this.listItems[key][`offset${offsetDimension}`],
        hoveredListItemSize: this.listItems[key][`client${sizeDimension}`],
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
    const {
      color,
      orientation,
    } = this.props;
    const {
      hoveredListItemOffset,
      hoveredListItemSize,
      hoveredListItemIsVisible,
    } = this.state;
    const dimension = orientation === HORIZONTAL ? 'X' : 'Y';
    const literalDimension = orientation === HORIZONTAL ? 'width' : 'height';
    return (
      <nav
        className={[styles.nav, styles[orientation]].join(' ')}
        onMouseLeave={this.onMouseLeave}
      >
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
            [literalDimension]: BAR_SIZE,
            opacity: hoveredListItemIsVisible ? 1 : 0,
            backgroundColor: color,
            transform: `translate${dimension}(${hoveredListItemOffset || 0}px) scale${dimension}(${hoveredListItemSize / BAR_SIZE})`,
          }}
        />
      </nav>
    );
  }
}

export default component;
