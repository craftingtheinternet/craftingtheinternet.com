import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from 'components/Header';
import RichText from 'components/RichText';

const component = ({
  title,
  content,
  typeColor,
}) => (
  <div style={{ color: typeColor }}>
    {title && (
      <Header giant>{title.split(' ').reverse().join(' ')}</Header>
    )}
    {content && (
      <RichText columns={2}>
        {content}
      </RichText>
    )}
  </div>
);

component.displayName = 'Home';
component.defaultProps = {
  title: undefined,
  content: undefined,
  typeColor: 'black',
};
component.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  typeColor: PropTypes.string,
};

const mapStateToProps = state => ({
  title: state.about.title,
  content: state.about.content,
});

export { component };

export default connect(mapStateToProps)(component);
