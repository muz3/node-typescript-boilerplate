import React from 'react';
import { shallow } from 'enzyme';

import { orders } from './__fixture__/orders';
import StatusBox from '../StatusBox';

describe('Component StatusBox', () => {
  it('should render StatusBox with no orders', () => {
    const component = shallow(<StatusBox name="My Order" orders={[]} />);
    expect(component).toMatchSnapshot();
  });

  it('should render StatusBox with less than 5 orders', () => {
    const component = shallow(<StatusBox name="My Order" orders={orders.slice(0, 3)} />);
    expect(component).toMatchSnapshot();
  });

  it('should render StatusBox with more than 5 orders', () => {
    const component = shallow(<StatusBox name="My Order" orders={orders} />);
    expect(component).toMatchSnapshot();

    // click show more
    component.find('Button').simulate('click');
    expect(component).toMatchSnapshot();

    // click show less
    component.find('Button').simulate('click');
    expect(component).toMatchSnapshot();
  });
});
