import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/theme';
import GlobalStyle from '../src/components/GlobalStyle';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.tsx?$/);
function loadStories() {
  req.keys().forEach(req);
}

// Global configuration for the info addon across all of your stories.
addDecorator(
  withInfo({
    inline: true,
  })
);

addDecorator(story => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      {story() as JSX.Element}
    </ThemeProvider>
  </>
));

configure(loadStories, module);
