import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.styl';

const removeOrphans = text => text
  .split(' ')
  .slice(0, text.split(' ').length - 2)
  .concat(text
    .split(' ')
    .slice(-2)
    .join('\xa0'))
  .join(' ');

const component = ({
  giant,
  level,
  children,
}) => (
  children ? (
    React.createElement(
      `h${level}`,
      { className: [styles[`h${level}`], giant ? styles.giant : ''].join(' ') },
      removeOrphans(children),
    )
  ) : (
    null
  )
);

component.displayName = 'Header';
component.defaultProps = {
  giant: false,
  level: 1,
};
component.propTypes = {
  giant: PropTypes.bool,
  level: PropTypes.oneOf([1, 2, 3, 4, 5]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default component;
