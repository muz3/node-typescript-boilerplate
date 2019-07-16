import React from 'react';
import { shallow } from 'enzyme';

import AppFooter from '..';

describe('Component AppFooter', () => {
  it('should render AppFooter correctly', () => {
    const component = shallow(<AppFooter />);

    expect(component).toMatchSnapshot();
  });
});
