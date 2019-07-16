import React from 'react';
import { shallow } from 'enzyme';

import MarkerIcon from '../MarkerIcon';

describe('Component MarkerIcon', () => {
  it('should render MarkerIcon correctly', () => {
    const component = shallow(<MarkerIcon />);

    expect(component).toMatchSnapshot();
  });
});
