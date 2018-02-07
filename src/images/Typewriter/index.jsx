import React from 'react';
import PropTypes from 'prop-types';
import { viewBox, paths } from './svg.json';
import styles from './styles.styl';

const component = ({
  color,
  isClient,
}) => (
  <svg
    width="100%"
    viewBox={viewBox}
    stroke={color}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {isClient && paths.map(({
      d,
      className,
      transform,
      strokeWidth,
    }) => (
      <path
        d={d}
        key={className}
        className={styles[className]}
        transform={transform}
        strokeWidth={strokeWidth}
      />
    ))}
  </svg>
);

component.displayName = 'Typewriter';
component.defaultProps = {
  color: 'black',
  isClient: typeof window !== 'undefined',
};
component.propTypes = {
  color: PropTypes.string,
  isClient: PropTypes.bool,
};

export default component;
