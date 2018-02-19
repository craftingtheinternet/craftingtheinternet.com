import React from 'react';
import PropTypes from 'prop-types';
import universal from 'react-universal-component';

const asyncImage = src => universal(import(`images/${src}`), {
  loading: () => null,
  error: () => null,
});

const component = ({ src, ...props }) => {
  const AsyncImage = asyncImage(src);
  return (
    <AsyncImage {...props} />
  );
};

component.displayName = 'Image';
component.propTypes = {
  src: PropTypes.string.isRequired,
};

export default component;
