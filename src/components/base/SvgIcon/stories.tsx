import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckBoxIcon from '@src/components/base/SvgIcon/CheckBox';
import CheckBoxOutlinedIcon from '@src/components/base/SvgIcon/CheckBoxOutlined';
import CheckBoxOutlineBlankIcon from '@src/components/base/SvgIcon/CheckBoxOutlineBlank';

storiesOf('Components/base', module).add('SvgIcon', () => (
  <div>
    <h3>CheckBox</h3>
    <CheckBoxOutlineBlankIcon fontSize={4} color="red" />
    <CheckBoxIcon />
    <CheckBoxOutlinedIcon />
    <CheckBoxOutlineBlankIcon />

    <CheckBoxOutlinedIcon fontSize={7} variant="secondary" />
    <CheckBoxIcon fontSize={7} color="#07c" />
    <CheckBoxOutlineBlankIcon fontSize={7} color="rgba(0, 0, 0, 0.54)" />
  </div>
));
