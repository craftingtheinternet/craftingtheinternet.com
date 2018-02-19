import React from 'react';
import PropTypes from 'prop-types';
import { viewBox, paths } from './svg.json';
import styles from './styles.styl';

const component = ({
  color,
  disableAnimation,
}) => (
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
        className={[styles[className], (disableAnimation ? styles.disableAnimation : '')].join(' ')}
        transform={transform}
      />
    ))}
  </svg>
);

component.displayName = 'TheInternet';
component.defaultProps = {
  color: 'black',
  disableAnimation: false,
};
component.propTypes = {
  color: PropTypes.string,
  disableAnimation: PropTypes.bool,
};

export default component;
