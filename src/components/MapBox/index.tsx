import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, ViewState } from 'react-map-gl';

import { theme } from '@src/theme';
import Flex, { Props as FlexProps } from '@src/components/base/Grid/Flex';
import { DeliveringOrder } from '@src/containers/OrderList/types';
import { MapboxState } from '@src/containers/MapBox/types';
import MarkerIcon from './MarkerIcon';
import Popup, { PopupInfo } from './Popup';

export type Props = {
  origin: MapboxState['origin'];
  viewport: ViewState;
  deliveringOrders: DeliveringOrder[];
  mapStyle: any;
  deliverSimulationStarted: boolean;

  // actions
  setViewport: (v: ViewState) => void;
  // operations
  fetchOriginOperation: () => void;
} & FlexProps;

/**
 * Render the MapBox container
 */
export function MapBox({ deliveringOrders, color, ...props }: Props) {
  const {
    coordinates: [originLongitude, originLatitude],
    address,
  } = props.origin;

  // It's not really needed to move this state to redux, so useState instead
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  const handleMarkerClick = (info: PopupInfo | null) => {
    return () => setPopupInfo(info);
  };

  // fetchOriginOperation when component is mounted
  useEffect(() => {
    if (!props.deliverSimulationStarted) {
      props.fetchOriginOperation();
    }
  }, [] /* only execute once */);

  return (
    <Flex {...props}>
      <ReactMapGL
        mapStyle={props.mapStyle}
        {...props.viewport}
        width="100%"
        height="100%"
        onViewportChange={props.setViewport}
      >
        {/* Render Home Marker */}
        <Marker longitude={originLongitude} latitude={originLatitude}>
          <MarkerIcon
            color={theme.colors.common.red}
            onClick={handleMarkerClick({
              longitude: originLongitude,
              latitude: originLatitude,
              title: 'Home',
              subtitle: address,
            })}
          />
        </Marker>

        {/* Render Delivering Markers */}
        {deliveringOrders.map(
          ({ coordinates: [longitude, latitude], destination, name }, index) => (
            <Marker key={index} longitude={longitude} latitude={latitude}>
              <MarkerIcon
                onClick={handleMarkerClick({
                  longitude,
                  latitude,
                  subtitle: destination,
                  title: name,
                })}
              />
            </Marker>
          )
        )}

        {/* Render Popup */}
        <Popup popupInfo={popupInfo} onClose={handleMarkerClick(null)} />
      </ReactMapGL>
    </Flex>
  );
}

MapBox.defaultProps = {
  padding: 0,
};

export default MapBox;
