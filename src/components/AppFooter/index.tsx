import React from 'react';

import A from '@src/components/base/A';
import Footer from '@src/components/base/Footer/Footer';
import Heart from '@src/components/base/SvgIcon/Heart';
import AboutLink from './AboutLink';

export function AppFooter() {
  return (
    <Footer>
      Made with&nbsp;
      <Heart fontSize={5} color="rgb(255, 85, 85)" />
      &nbsp;by&nbsp;
      <A target="_blank" href="https://github.com/inkless" color="white">
        @Guangda Zhang
      </A>
      &nbsp;|&nbsp;
      <AboutLink />
    </Footer>
  );
}

export default AppFooter;
