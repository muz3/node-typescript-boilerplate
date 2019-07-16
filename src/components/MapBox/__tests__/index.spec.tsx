import React from 'react';

import { props as mapProps } from './__fixture__/mapbox';
import MapBox, { Props as MapBoxProps } from '..';
import { mountWithTheme } from '@src/utils/test-helper';

describe('Component MapBox', () => {
  let props: MapBoxProps;
  beforeEach(() => {
    props = {
      ...mapProps,
    };
  });

  afterAll(() => {
    (props as any) = null;
  });

  it('should render MapBox correctly', () => {
    // shallow does not really support useEffect yet
    // so using mountWithTheme instead
    // https://github.com/airbnb/enzyme/issues/2011
    const component = mountWithTheme(<MapBox {...props} />);

    expect(props.fetchOriginOperation).toHaveBeenCalledTimes(1);
    expect(props.setViewport).toHaveBeenCalled();
    expect(component).toMatchSnapshot();
  });
});
