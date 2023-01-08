import Crafting from 'components/BrandIdent/crafting.svg';
import { FC } from 'react';

import styled from 'styled-components';

export interface BrandIdentProps {
  disableAnimation: boolean;
}

const Container = styled.div`
  display: flex;
  flex: 0 1 auto;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  align-items: center;
  width: 100%;
  max-width: 21rem;
  padding; 3.375rem 1.5rem 0;
`;

const component: FC<BrandIdentProps> = ({ disableAnimation = false }) => (
  <Container dangerouslySetInnerHTML={{ __html: `${Crafting}` }} />
);

export default component;
