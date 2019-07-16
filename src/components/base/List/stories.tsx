import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import List from './List';
import ListItem from './ListItem';

storiesOf('Components/base', module).add('List', () => (
  <div>
    <List>
      <ListItem onClick={action('click-item-1')}>item 1</ListItem>
      <ListItem onClick={action('click-item-2')}>item 2</ListItem>
      <ListItem onClick={action('click-item-3')}>item 3</ListItem>
    </List>
  </div>
));
