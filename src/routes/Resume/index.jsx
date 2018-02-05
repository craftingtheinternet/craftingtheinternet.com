import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from 'components/Header';
import RichText from 'components/RichText';

const component = ({
  title,
  abstract,
  typeColor,
  education,
  workEligibility,
  workHistory,
}) => (
  <div style={{ color: typeColor }}>
    <Header giant>{title}</Header>
    <RichText columns={2}>
      {abstract}
    </RichText>
    {education}
    {workEligibility}
    {workHistory}
  </div>
);

component.displayName = 'Resume';
component.defaultProps = {
  title: undefined,
  abstract: undefined,
  typeColor: 'black',
  education: undefined,
  workEligibility: [],
  workHistory: [],
};
component.propTypes = {
  title: PropTypes.string,
  abstract: PropTypes.string,
  typeColor: PropTypes.string,
  education: PropTypes.shape({
    additionalNotes: PropTypes.string,
    degree: PropTypes.string,
    placeOfStudy: PropTypes.string,
  }),
  workEligibility: PropTypes.arrayOfType(PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  workHistory: PropTypes.arrayOfType(PropTypes.shape({
    company: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  })),
};

const mapStateToProps = state => ({
  title: state.resume.title,
  abstract: state.resume.abstract,
});

export { component };

export default connect(mapStateToProps)(component);
