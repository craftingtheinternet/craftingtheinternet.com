import React from 'react';
import PropTypes from 'prop-types';
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

export default component;
