/* eslint-disable @next/next/no-head-element */
import Switcher from 'containers/Switcher';

import BrandIdent from 'components/BrandIdent';
import Navigation from 'components/Navigation';
import Strapline from 'components/Strapline';

import { StyledComponentsRegistry } from 'components/StyledComponentsRegistry';
import Image from 'next/image';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface LayoutProps {
  children?: ReactNode;
}

const MobileOnly = styled.div``;

const DesktopOnly = styled.div``;

const Heraldry = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 91vh;
  width: 100%;
  justify-content: stretch;
`;

const Branding = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
`;

const PageIdent = styled.div`
  flex: 0 1 auto;
  padding: 0 0.5rem 0 0;
  margin: 0;
  line-height: 0;
`;

const LeftIdent = styled(Image)`
  display: flex;
  flex: 0 1 33.333%;
  flex-direction: column;
`;

const RightIdent = styled(Image)`
  display: flex;
  flex: 1 0 66.666%;
  padding: 0 3rem 0 1.5rem;
  flex-direction: column;
`;

const ContentPane = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 0 auto;
  flex-wrap: wrap;
  font-size: 1rem;
  line-height: 1.8;
`;

export const Layout: FC<LayoutProps> = ({ children }) => (
  <html>
    <head />
    <body>
      <StyledComponentsRegistry>
        <Heraldry>
          <Branding>
            <LeftIdent src="/crafting.svg" alt="Crafting" />
            <RightIdent src="/the-internet.svg" alt="The Internet" />
          </Branding>
          <PageIdent>
            {/* {pageIdent && (
                <Image
                  color={typeColor}
                  disableAnimation={!hasPreviousLocation}
                  src={pageIdent}
                />
              )} */}
          </PageIdent>
        </Heraldry>
        <ContentPane>
          {!mobile && (
            <div className={styles.left}>
              {tablet && (
                <React.Fragment>
                  <BrandIdent disableAnimation={hasPreviousLocation} />
                  <Strapline disableAnimation={hasPreviousLocation} />
                  <Navigation color={typeColor} orientation="vertical" />
                </React.Fragment>
              )}
              <figure className={styles.pageIdent}>
                {pageIdent && <Image src={pageIdent} color={typeColor} />}
              </figure>
            </div>
          )}
          <main
            className={[
              styles.content,
              mobile ? styles.mobileContent : styles.right,
            ].join(' ')}
          >
            <Switcher typeColor={typeColor} />
          </main>
        </ContentPane>
      </StyledComponentsRegistry>
    </body>
  </html>
);
