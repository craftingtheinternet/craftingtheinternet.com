import React from 'react';
import PropTypes from 'prop-types';
import { viewBox, paths } from './svg.json';
import styles from './styles.styl';

const component = ({
  color,
  isClient,
  disableAnimation,
}) => (
  <svg
    width="100%"
    viewBox={viewBox}
    stroke={color}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {isClient && paths.map(({ d, className, transform }) => (
      <path
        d={d}
        key={className}
        className={[styles[className], (disableAnimation ? styles.disableAnimation : '')].join(' ')}
        transform={transform}
      />
    ))}
  </svg>
);

component.displayName = 'SelfPortrait';
component.defaultProps = {
  color: 'black',
  isClient: typeof window !== 'undefined',
  disableAnimation: false,
};
component.propTypes = {
  color: PropTypes.string,
  isClient: PropTypes.bool,
  disableAnimation: PropTypes.bool,
};

export default component;
