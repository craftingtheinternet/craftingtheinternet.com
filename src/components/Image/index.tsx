import * as PropTypes from "prop-types";
import * as React from "react";
import universal from "react-universal-component";

interface Props {
  src: string;
  [others: string]: any;
}

const asyncImage = (src: string): React.SFC =>
  universal(import(`images/${src}`), {
    error: (): null => null,
    loading: (): null => null
  });

const component: React.SFC<Props> = ({ src, ...props }) => {
  const AsyncImage = asyncImage(src);
  return <AsyncImage {...props} />;
};

component.displayName = "Image";

export default component;
