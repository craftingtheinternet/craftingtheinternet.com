import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import activeHtml from 'react-active-html';
import styles from './styles.styl';

const component = ({
  children,
  columns,
}) => (
  <div
    className={styles.content}
    style={{ columnCount: columns }}
  >
    {typeof children === 'string' && activeHtml(children)}
  </div>
);

component.displayName = 'About';
component.defaultProps = {
  columns: undefined,
};
component.propTypes = {
  children: PropTypes.string.isRequired,
  columns: PropTypes.number,
};

const mapStateToProps = state => ({
  title: state.about.title,
  content: state.about.content,
});

export { component };

export default connect(mapStateToProps)(component);
