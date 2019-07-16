import React from 'react';
import { shallow } from 'enzyme';

import AboutLink from '../AboutLink';

describe('Component AboutLink', () => {
  it('should render AboutLink correctly', () => {
    const component = shallow(<AboutLink />);

    expect(component).toMatchSnapshot();
  });
});
