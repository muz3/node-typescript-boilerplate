import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '@src/components/base/Grid/Box';
import Text from '@src/components/base/Typography/Text';
import Heading from '@src/components/base/Typography/Heading';

storiesOf('Components/base', module).add('Typography', () => (
  <Box border={1}>
    <Heading>This is Heading</Heading>
    <Text>This is some text</Text>
  </Box>
));
