'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { FC, ReactNode, useState } from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

type Instance = ServerStyleSheet & { clearTag: () => void };

interface StyledComponentsRegistryProps {
  children?: ReactNode;
}

export const StyledComponentsRegistry: FC<StyledComponentsRegistryProps> = ({
  children,
}) => {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    (styledComponentsStyleSheet.instance as Instance).clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
};
