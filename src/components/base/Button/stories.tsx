import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Flex from '@src/components/base/Grid/Flex';
import Button from './Button';

storiesOf('Components/base', module).add('Button', () => (
  <div>
    <Flex>
      <Button mr={3} variant="primary" onClick={action('button-click')}>
        Primary Button
      </Button>
      <Button disabled={true} variant="primary" onClick={action('button-click')}>
        Disabled Primary Button
      </Button>
    </Flex>
    <Flex>
      <Button mr={3} onClick={action('button-click')}>
        Default Button
      </Button>
      <Button disabled={true} onClick={action('button-click')}>
        Disabled Button
      </Button>
    </Flex>
    <Flex>
      <Button mr={3} onClick={action('button-click')} />
      <Button label="My Button" variant="primary" mr={3} onClick={action('button-click')} />
    </Flex>
  </div>
));
