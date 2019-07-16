import React from 'react';
import { shallow } from 'enzyme';
import { Popup as MapGLPopup } from 'react-map-gl';

import Popup from '../Popup';

describe('Component Popup', () => {
  it('should not render Popup if info is null', () => {
    const component = shallow(<Popup popupInfo={null} />);
    expect(component).toMatchSnapshot();
  });

  it('should render MapGL Popup if info is provided', () => {
    const popupInfo = {
      longitude: -100,
      latitude: 37,
      title: 'Title',
      subtitle: 'Sub Title',
    };

    const component = shallow(<Popup popupInfo={popupInfo} />);
    expect(component).toMatchSnapshot();
  });

  it('should call onClose when popup is closed', () => {
    const popupInfo = {
      longitude: -100,
      latitude: 37,
      title: 'Title',
      subtitle: 'Sub Title',
    };

    const onCloseSpy = jest.fn();
    const component = shallow(<Popup popupInfo={popupInfo} onClose={onCloseSpy} />);
    const mapGlPopup = component.find(MapGLPopup);
    expect(mapGlPopup).not.toBeNull();
    const props = mapGlPopup.props();
    props.onClose && props.onClose();
    expect(onCloseSpy).toHaveBeenCalled();
  });
});
