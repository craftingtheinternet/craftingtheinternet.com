import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.styl';
import { viewBox, paths } from './svg.json';

class component extends PureComponent {
  static displayName = 'SelfPortrait';
  static defaultProps = {
    color: '#000',
  };
  static propTypes = {
    color: PropTypes.string,
  };

  render() {
    const { color } = this.props;
    return (
      <svg
        width="100%"
        viewBox={viewBox}
        stroke={color}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map(({ d, className, transform }) => (
          <path
            d={d}
            key={className}
            className={styles[className]}
            transform={transform}
          />
        ))}
      </svg>
    );
  }
}

export default component;
