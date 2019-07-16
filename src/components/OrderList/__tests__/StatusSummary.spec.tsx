import React from 'react';
import { shallow } from 'enzyme';

import { statuses } from './__fixture__/statuses';
import StatusSummary from '../StatusSummary';

describe('Component StatusSummary', () => {
  it('should render StatusSummary correctly', () => {
    const component = shallow(<StatusSummary statuses={statuses} />);

    expect(component).toMatchSnapshot();
  });
});
