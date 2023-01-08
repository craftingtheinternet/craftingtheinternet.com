import parse, { DOMNode, domToReact, Element } from 'html-react-parser';
import Link from 'next/link';
import { FC, ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

export interface Props {
  children?: string;
  className?: string;
}

export interface AnchorProps {
  href: string;
  target: string;
  style: {};
  children: ReactNode;
}

const Content = styled.div`
  p {
    margin: 0 0 0.75rem;
    text-align: justify;
  }

  b,
  strong {
    font-weight 600;
  }
`;

const replace = (domNode: DOMNode): ReactElement | void => {
  const { type, name, children, attribs } = domNode as Element;

  if (type !== 'tag' || name !== 'a') {
    return;
  }

  const isExternal = attribs.href.startsWith('http');

  if (isExternal) {
    return (
      <a href={attribs.href} target={attribs.target}>
        {domToReact(children)}
      </a>
    );
  }

  return (
    <Link
      href={attribs.href.startsWith('/') ? attribs.href : `/${attribs.href}`}
      style={{ color: 'inherit' }}
    >
      {domToReact(children)}
    </Link>
  );
};

export const RichText: FC<Props> = ({ children, className }) => {
  if (!children) {
    return null;
  }

  return (
    <Content className={className}>{parse(children, { replace })}</Content>
  );
};
