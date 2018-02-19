import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import Header from 'containers/Header';
import RichText from 'components/RichText';
import styles from './styles.styl';

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
    <Header level={2}>In Brief</Header>
    <RichText columns={2}>
      {abstract}
    </RichText>
    <div className={styles.separator} />
    <Header level={2}>Education</Header>
    {education && (
      <Fragment>
        <div className={styles.degree}>
          {education.degree}
        </div>
        <div className={styles.placeOfStudy}>
          {education.placeOfStudy}
        </div>
        <div className={styles.additionalNotes}>
          {education.additionalNotes}
        </div>
      </Fragment>
    )}
    <div className={styles.separator} />
    <Header level={2}>Work Eligibility</Header>
    <ul className={styles.workEligibility}>
      {workEligibility.map(eligibility => (
        <li
          key={eligibility.title}
          className={styles.workEligibilityItem}
        >
          <div className={styles.workEligibilityTitle}>{eligibility.title}</div>
          <div className={styles.workEligibilityValue}>{eligibility.value}</div>
        </li>
      ))}
    </ul>
    <div className={styles.separator} />
    <Header level={2}>Professional History</Header>
    <ul className={styles.workHistory}>
      {workHistory.sort(descendingDate).map(job => (
        <li
          key={job.company}
          className={styles.workHistoryItem}
        >
          <div className={styles.dates}>
            {`${dateFormat(job.from, DATE_FORMAT)} — ${dateFormat(job.to, DATE_FORMAT)}`}
          </div>
          {job.company.toLowerCase() === 'freelance' ? (
            <div className={styles.position}>{job.company} {job.position}</div>
          ) : (
            <div className={styles.position}>{job.position} at {job.company}</div>
          )}
          <div className={styles.description}>{job.description}</div>
        </li>
      ))}
    </ul>
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
