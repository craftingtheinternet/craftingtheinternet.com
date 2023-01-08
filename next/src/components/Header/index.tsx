import { FC } from 'react';
import styled, { css } from 'styled-components';

export interface HeaderProps {
  giant?: boolean;
  level: 1 | 2 | 3 | 4 | 5;
  children?: string;
}

const sizes: Record<HeaderProps['level'], number> = {
  1: 1.875,
  2: 1.5,
  3: 1.125,
  4: 0.9375,
  5: 0.825,
};

const Heading = styled.span<Pick<HeaderProps, 'giant' | 'level'>>(
  ({ giant, level }) => css`
  line-height 1
  margin ${giant ? '0.8em 0' : '0 0 1.5rem'};
  font-weight: 600;
  font-size: ${giant ? sizes[level] * 2 : sizes[level]};
`
);

export const Header: FC<HeaderProps> = ({ giant, level, children = '' }) => {
  if (!children) {
    return null;
  }

  return (
    <Heading as={`h${level}`} giant={giant} level={level}>
      {children}
    </Heading>
  );
};
