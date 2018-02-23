import * as React from "react";
import universal from "react-universal-component";

import importCss from "babel-plugin-universal-import/importCss.js";

interface Props {
  src: string;
  [others: string]: any;
}

const AsyncImage: React.SFC<Props> = universal(
  ({ src }: Props): PromiseLike<any> =>
    Promise.all([
      import(/* webpackChunkName: '[request]' */ `images/${src}`),
      importCss(src)
    ]).then(promises => promises[0]),
  {
    chunkName: ({ src }: Props) => src,
    resolve: ({ src }: Props) => require.resolveWeak(`images/${src}`)
  }
);

const component: React.SFC<Props> = ({ src, ...props }) => {
  return <AsyncImage src={src} {...props} />;
};

component.displayName = "Image";

export default component;
