'use client';

import { Header } from 'components/Header';
import NextLink from 'next/link';
import { FC } from 'react';
import styled from 'styled-components';

interface AboutProps {
  content?: string;
  quote?: string;
  quoteAttribution?: string;
  title?: string;
}

const Container = styled.div`
  color: white;
`;

const Paragraph = styled.p``;

const Strong = styled.strong``;

const Blockquote = styled.blockquote`
  font-weight bold;
  font-size 1.125rem;
  padding 0;
  margin 0 0 0.75rem;
  
  ${Paragraph} {
    margin 0;
    text-align justify;
  }
`;

const Footer = styled.footer`
  display block;
  text-align right;
  font-size 0.75rem;
`;

const Link = styled(NextLink)`
  color: inherit;
`;

export const About: FC<AboutProps> = () => (
  <Container>
    <Header giant={true} level={1}>
      Engineering as a Service
    </Header>
    <Blockquote>
      <Paragraph>
        Simple things should be simple and complex things should be possible.
      </Paragraph>
      <Footer>{`— Alan Kay`}</Footer>
    </Blockquote>
    <Paragraph>
      Welcome to <Strong>Crafting the Internet</Strong>. I&rsquo;m Ben, the
      Director. Pleased to meet you.
    </Paragraph>
    <Paragraph>
      We offer outsource services for the web industry. As dedicated polyglot
      engineers, we make it a matter of personal pride to provide engineering
      and architectural design for web, desktop &amp; mobile software.
    </Paragraph>
    <Paragraph>
      Understanding that there&rsquo;s no molehill that cannot be made a
      mountain and striving always to avoid that situation we emphasise the
      simplicity, legibility &amp; continued maintenance of our work. Coupled
      with resilient best practices, rigorous testing and performance finessing,
      we maintain an unbreakable ethos, which we like to call{' '}
      <Strong>crafting</Strong>.
    </Paragraph>
    <Paragraph>
      We have developed and contributed to software applications across a vast
      range of industries. Clients vary from enterprises worth hundreds of
      millions, to small passion projects. All of our customers are given equal
      diligence, and have come to expect an extremely high standard of service,
      care and professionalism from Crafting the Internet.
    </Paragraph>
    <Paragraph>
      Are you a business looking for brilliant engineers to fulfil your next
      project&rsquo;s needs and exceed your expectations? Simply{' '}
      <Link href="/contact">drop us a line</Link> to discuss your requirements
      &amp; budget, and we&rsquo;ll tailor a solution for you.
    </Paragraph>
  </Container>
);
