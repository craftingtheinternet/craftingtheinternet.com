import * as React from "react";
import { connect } from "react-redux";

import RichText from "components/RichText";
import ContactForm from "containers/ContactForm";
import Header from "containers/Header";

export interface Props {
  typeColor?: string;
}

export interface MappedProps {
  content?: string;
  mobile: boolean;
  title?: string;
}

export interface ReduxProps {
  contact: {
    title?: string;
    content?: string;
  };
  breakpoint: {
    lessThan: {
      medium: boolean;
    };
  };
}

const component: React.SFC<Props & MappedProps> = ({
  content,
  mobile,
  title,
  typeColor
}) => (
  <div style={{ color: typeColor }}>
    <Header giant={true}>{title}</Header>
    <RichText>{content}</RichText>
    <ContactForm mobile={mobile} />
  </div>
);

component.displayName = "About";
component.defaultProps = {
  content: undefined,
  mobile: true,
  title: undefined,
  typeColor: "white"
};

const mapStateToProps = (state: ReduxProps): MappedProps => ({
  content: state.contact.content,
  mobile: state.breakpoint.lessThan.medium,
  title: state.contact.title
});

export { component };

export default connect(mapStateToProps)(component);
