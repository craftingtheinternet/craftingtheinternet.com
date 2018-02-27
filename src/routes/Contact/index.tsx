import * as React from "react";
import { connect } from "react-redux";

import BlockQuote from "components/BlockQuote";
import RichText from "components/RichText";
import Header from "containers/Header";

export interface Props {
  typeColor?: string;
}

export interface MappedProps {
  content?: string;
  title?: string;
}

export interface ReduxProps {
  contact: {
    title?: string;
    content?: string;
  };
}

const component: React.SFC<Props & MappedProps> = ({
  title,
  content,
  typeColor
}) => (
  <div style={{ color: typeColor }}>
    <Header giant={true}>{title}</Header>
    <RichText>{content}</RichText>
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
  title: state.contact.title
});

export { component };

export default connect(mapStateToProps)(component);
