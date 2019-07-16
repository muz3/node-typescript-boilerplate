import React from 'react';
import { Normalize } from 'styled-normalize';

import routes from '@src/routes';
import AppFooter from '@src/components/AppFooter';
import GlobalStyle from '@src/components/GlobalStyle';

const Application = () => (
  <>
    <Normalize />
    <GlobalStyle />
    <main>{routes}</main>
    <AppFooter />
  </>
);

export default Application;
