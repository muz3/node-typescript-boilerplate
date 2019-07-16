import React from 'react';
import { storiesOf } from '@storybook/react';
import Badge from '@src/components/base/Badge/Badge';

storiesOf('Components/base', module).add('Badge', () => (
  <div>
    <Badge mr={1}>Primary</Badge>
    <Badge variant="secondary" mr={1}>
      Secondary
    </Badge>
    <Badge variant="error" mr={1}>
      Error
    </Badge>
    <Badge variant="disabled" mr={1}>
      Disabled
    </Badge>
  </div>
));
