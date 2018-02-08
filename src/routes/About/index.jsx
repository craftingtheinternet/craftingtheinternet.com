import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from 'containers/Header';
import RichText from 'components/RichText';
import BlockQuote from 'components/BlockQuote';

const component = ({
  title,
  content,
  quote,
  quoteAttribution,
  typeColor,
}) => (
  <div style={{ color: typeColor }}>
    <Header giant>{title}</Header>
    {quote && (
      <BlockQuote attribution={quoteAttribution}>{quote}</BlockQuote>
    )}
    <RichText columns={2}>
      {content}
    </RichText>
  </div>
);

component.displayName = 'About';
component.defaultProps = {
  title: undefined,
  content: undefined,
  quote: undefined,
  quoteAttribution: undefined,
  typeColor: 'black',
};
component.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  quote: PropTypes.string,
  quoteAttribution: PropTypes.string,
  typeColor: PropTypes.string,
};

const mapStateToProps = state => ({
  title: state.about.title,
  content: state.about.content,
  quote: state.about.quote,
  quoteAttribution: state.about.quoteAttribution,
});

export { component };

export default connect(mapStateToProps)(component);
