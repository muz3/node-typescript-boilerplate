import React from 'react';
import { storiesOf } from '@storybook/react';
import A from './';

storiesOf('Components/base', module).add('A', () => (
  <A target="_blank" href="https://www.google.com">
    Google
  </A>
));
