import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  mediaType,
  mobile,
}) => (
  children ? (
    React.createElement(
      `h${level}`,
      { className: [styles[`h${level}`], mediaType, giant ? styles.giant : ''].join(' ') },
      mobile ? children : removeOrphans(children),
    )
  ) : (
    null
  )
);

component.displayName = 'Header';
component.defaultProps = {
  giant: false,
  level: 1,
  mediaType: '',
  mobile: false,
};
component.propTypes = {
  giant: PropTypes.bool,
  level: PropTypes.oneOf([1, 2, 3, 4, 5]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  mediaType: PropTypes.string,
  mobile: PropTypes.bool,
};

const mapStateToProps = state => ({
  mediaType: state.breakpoint.mediaType,
  mobile: state.breakpoint.lessThan.medium,
});

export { component };

export default connect(mapStateToProps)(component);
