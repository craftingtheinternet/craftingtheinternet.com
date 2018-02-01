import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import activeHtml from 'react-active-html';

const component = ({
  title,
  content,
}) => (
  <div>
    {title && <h1>{title.split(' ').reverse().join(' ')}</h1>}
    {content && activeHtml(content).reverse()}
  </div>
);

component.displayName = 'Home';
component.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  title: state.about.title,
  content: state.about.content,
});

export { component };

export default connect(mapStateToProps)(component);
