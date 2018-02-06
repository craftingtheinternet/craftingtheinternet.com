import React from 'react';
import PropTypes from 'prop-types';
import { viewBox, paths } from './svg.json';
import styles from './styles.styl';

const component = ({ color }) => (
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

component.displayName = 'SelfPortrait';
component.defaultProps = {
  color: 'black',
};
component.propTypes = {
  color: PropTypes.string,
};

export default component;
