import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import Header from 'components/Header';
import RichText from 'components/RichText';

const DATE_FORMAT = 'mmm yyyy';

const descendingDate = (a, b) => new Date(b.from).getTime() - new Date(a.from).getTime();

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
    {education && (
      <div>
        {education.degree}
        {education.placeOfStudy}
        {education.additionalNotes}
      </div>
    )}
    {workEligibility.map(eligibility => (
      <div>
        {eligibility.title} {eligibility.value}
      </div>
    ))}
    {workHistory.sort(descendingDate).map(job => (
      <ul>
        <li>{`${dateFormat(job.from, DATE_FORMAT)} — ${dateFormat(job.to, DATE_FORMAT)}`}</li>
        {job.company.toLowerCase() === 'freelance' ? (
          <li>{job.company} {job.position}</li>
        ) : (
          <li>{job.position} at {job.company}</li>
        )}
        <li>{job.description}</li>
      </ul>
    ))}
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
  workEligibility: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  workHistory: PropTypes.arrayOf(PropTypes.shape({
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
  education: state.resume.education,
  workEligibility: state.resume.workEligibility,
  workHistory: state.resume.workHistory,
});

export { component };

export default connect(mapStateToProps)(component);
