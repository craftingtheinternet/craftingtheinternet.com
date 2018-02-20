import * as PropTypes from "prop-types";
import * as React from "react";
import { connect } from "react-redux";

import BlockQuote from "components/BlockQuote";
import RichText from "components/RichText";
import Header from "containers/Header";

export interface Props {
  title?: string;
  content?: string;
  quote?: string;
  quoteAttribution?: string;
  typeColor?: string;
}

export interface ReduxProps {
  about: {
    title?: string;
    content?: string;
    quote?: string;
    quoteAttribution?: string;
  };
}

const component: React.SFC<Props> = ({
  title,
  content,
  quote,
  quoteAttribution,
  typeColor
}) => (
  <div style={{ color: typeColor }}>
    <Header giant={true}>{title}</Header>
    {quote && <BlockQuote attribution={quoteAttribution}>{quote}</BlockQuote>}
    <RichText>{content}</RichText>
  </div>
);

component.displayName = "About";
component.defaultProps = {
  content: undefined,
  quote: undefined,
  quoteAttribution: undefined,
  title: undefined,
  typeColor: "black"
};
component.propTypes = {
  content: PropTypes.string,
  quote: PropTypes.string,
  quoteAttribution: PropTypes.string,
  title: PropTypes.string,
  typeColor: PropTypes.string
};

const mapStateToProps = (state: ReduxProps) => ({
  content: state.about.content,
  quote: state.about.quote,
  quoteAttribution: state.about.quoteAttribution,
  title: state.about.title
});

export { component };

export default connect(mapStateToProps)(component);
