import * as React from "react";
import { connect } from "react-redux";

import RichText from "components/RichText";
import ContactForm from "containers/ContactForm";
import Header from "containers/Header";

import * as actions from "actions/contactForm";

export interface Props {
  typeColor?: string;
}

export interface MappedProps {
  content?: string;
  hasSubmitted: boolean;
  successfulSubmissionMessage?: string;
  title?: string;
}

export interface DispatchProps {
  setSubmitted: typeof actions.setSubmitted;
}

export interface ReduxProps {
  contact: {
    title?: string;
    content?: string;
    successfulSubmissionMessage?: string;
  };
  contactForm: {
    hasSubmitted: boolean;
  };
  breakpoint: {
    lessThan: {
      medium: boolean;
    };
  };
}

const component: React.SFC<Props & MappedProps & DispatchProps> = ({
  content,
  hasSubmitted,
  setSubmitted,
  successfulSubmissionMessage,
  title,
  typeColor
}) => (
  <div style={{ color: typeColor }}>
    <Header giant={true}>{title}</Header>
    <RichText>{hasSubmitted ? successfulSubmissionMessage : content}</RichText>
    {!hasSubmitted && <ContactForm setSubmitted={setSubmitted} />}
  </div>
);

component.displayName = "About";
component.defaultProps = {
  content: undefined,
  title: undefined,
  typeColor: "white"
};

const mapStateToProps = (state: ReduxProps): MappedProps => ({
  content: state.contact.content,
  hasSubmitted: state.contactForm.hasSubmitted,
  successfulSubmissionMessage: state.contact.successfulSubmissionMessage,
  title: state.contact.title
});

const mapDispatchToProps = {
  setSubmitted: actions.setSubmitted
};

export { component };

export default connect(mapStateToProps, mapDispatchToProps)(component);
