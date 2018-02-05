import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from 'components/Header';
import RichText from 'components/RichText';

const component = ({
  title,
  abstract,
  typeColor,
}) => (
  <div style={{ color: typeColor }}>
    <Header giant>{title}</Header>
    <RichText columns={2}>
      {abstract}
    </RichText>
  </div>
);

component.displayName = 'Resume';
component.defaultProps = {
  title: undefined,
  abstract: undefined,
  typeColor: 'black',
};
component.propTypes = {
  title: PropTypes.string,
  abstract: PropTypes.string,
  typeColor: PropTypes.string,
};

const mapStateToProps = state => ({
  title: state.resume.title,
  abstract: state.resume.abstract,
});

export { component };

export default connect(mapStateToProps)(component);
