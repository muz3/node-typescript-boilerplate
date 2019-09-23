import React from 'react';
import { Normalize } from 'styled-normalize';

import routes from '@src/routes';
import GlobalStyle from '@src/components/GlobalStyle';

const Application = () => (
  <>
    <Normalize />
    <GlobalStyle />
    <main>{routes}</main>
  </>
);

export default Application;
