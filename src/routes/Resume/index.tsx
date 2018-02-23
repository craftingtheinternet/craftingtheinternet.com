import * as dateFormat from "dateformat";
import * as React from "react";
import { connect } from "react-redux";

import RichText from "components/RichText";
import Header from "containers/Header";

import { WorkEligibilityType, WorkHistoryType } from "reducers/resume";

import styles from "./styles.styl";

export type EducationType = {
  additionalNotes: string;
  degree: string;
  placeOfStudy: string;
};

export interface Props {
  typeColor?: string;
}

export interface MappedProps {
  title: string;
  abstract: string;
  education: EducationType;
  workEligibility: WorkEligibilityType[];
  workHistory: WorkHistoryType[];
}

export interface ReduxProps {
  resume: {
    title: string;
    abstract: string;
    education: EducationType;
    workEligibility: WorkEligibilityType[];
    workHistory: WorkHistoryType[];
  };
}

const DATE_FORMAT = "mmm yyyy";

const descendingDate = (a: WorkHistoryType, b: WorkHistoryType): number =>
  new Date(b.from).getTime() - new Date(a.from).getTime();

const component: React.SFC<Props & MappedProps> = ({
  title,
  abstract,
  typeColor,
  education,
  workEligibility,
  workHistory
}) => (
  <div style={{ color: typeColor }}>
    <Header giant={true}>{title}</Header>
    <Header level={2}>In Brief</Header>
    <RichText>{abstract}</RichText>
    <div className={styles.separator} />
    <Header level={2}>Education</Header>
    {education && (
      <React.Fragment>
        <div className={styles.degree}>{education.degree}</div>
        <div className={styles.placeOfStudy}>{education.placeOfStudy}</div>
        <div className={styles.additionalNotes}>
          {education.additionalNotes}
        </div>
      </React.Fragment>
    )}
    <div className={styles.separator} />
    <Header level={2}>Work Eligibility</Header>
    <ul className={styles.workEligibility}>
      {workEligibility.map(eligibility => (
        <li key={eligibility.title} className={styles.workEligibilityItem}>
          <div className={styles.workEligibilityTitle}>{eligibility.title}</div>
          <div className={styles.workEligibilityValue}>{eligibility.value}</div>
        </li>
      ))}
    </ul>
    <div className={styles.separator} />
    <Header level={2}>Professional History</Header>
    <ul className={styles.workHistory}>
      {workHistory.sort(descendingDate).map(job => (
        <li key={job.company} className={styles.workHistoryItem}>
          <div className={styles.dates}>
            {`${dateFormat(job.from, DATE_FORMAT)} — ${dateFormat(
              job.to,
              DATE_FORMAT
            )}`}
          </div>
          {job.company.toLowerCase() === "freelance" ? (
            <div className={styles.position}>
              {job.company} {job.position}
            </div>
          ) : (
            <div className={styles.position}>
              {job.position} at {job.company}
            </div>
          )}
          <div className={styles.description}>{job.description}</div>
        </li>
      ))}
    </ul>
  </div>
);

component.displayName = "Resume";
component.defaultProps = {
  abstract: undefined,
  education: undefined,
  title: undefined,
  typeColor: "black",
  workEligibility: [],
  workHistory: []
};

const mapStateToProps = (state: ReduxProps): MappedProps => ({
  abstract: state.resume.abstract,
  education: state.resume.education,
  title: state.resume.title,
  workEligibility: state.resume.workEligibility,
  workHistory: state.resume.workHistory
});

export { component };

export default connect(mapStateToProps)(component);
