import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import activeHtml from 'react-active-html';
import styles from './styles.styl';

const component = ({
  children,
}) => (
  <div className={styles.content}>
    {typeof children === 'string' && activeHtml(children)}
  </div>
);

component.displayName = 'RichText';
component.propTypes = {
  children: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  title: state.about.title,
  content: state.about.content,
});

export { component };

export default connect(mapStateToProps)(component);
