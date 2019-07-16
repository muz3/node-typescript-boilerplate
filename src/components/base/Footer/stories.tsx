import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '@src/components/base/Grid/Box';
import Footer from './Footer';

storiesOf('Components/base', module).add('Footer', () => (
  <Box pt={5} bg="red">
    <Footer style={{ position: 'static' }}>Static Footer</Footer>
    <Footer>Fixed Footer</Footer>
  </Box>
));
