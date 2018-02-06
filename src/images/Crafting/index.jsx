import React from 'react';
import PropTypes from 'prop-types';
import { viewBox, g } from './svg.json';
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
    {g.map(({ transform, path: { d, className } }) => (
      <g
        key={className}
        transform={transform}
      >
        <path
          d={d}
          className={[styles[className], (disableAnimation ? styles.disableAnimation : '')].join(' ')}
        />
      </g>
    ))}
  </svg>
);

component.displayName = 'Crafting';
component.defaultProps = {
  color: 'black',
  disableAnimation: false,
};
component.propTypes = {
  color: PropTypes.string,
  disableAnimation: PropTypes.bool,
};

export default component;
