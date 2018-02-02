import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from 'components/Header';
import RichText from 'components/RichText';

const component = ({
  title,
  content,
  typeColor,
}) => (
  <div style={{ color: typeColor }}>
    <Header giant>{title}</Header>
    <RichText columns={2}>
      {content}
    </RichText>
  </div>
);

component.displayName = 'About';
component.defaultProps = {
  title: undefined,
  content: undefined,
  typeColor: 'black',
};
component.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  typeColor: PropTypes.string,
};

const mapStateToProps = state => ({
  title: state.about.title,
  content: state.about.content,
});

export { component };

export default connect(mapStateToProps)(component);
