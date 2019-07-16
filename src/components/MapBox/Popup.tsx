import React from 'react';
import { Popup } from 'react-map-gl';

import { theme } from '@src/theme';
import Text from '@src/components/base/Typography/Text';

export type PopupInfo = {
  longitude: number;
  latitude: number;
  title: string;
  subtitle: string;
};

export type Props = {
  popupInfo: PopupInfo | null;
  onClose?: () => void;
};

/**
 * Render a Popup in Map
 * When props.popup is null, return null
 *
 * @param props.popupInfo
 * @param props.onClose
 */
export function MapPopup({ popupInfo, onClose }: Props) {
  if (!popupInfo) {
    return null;
  }
  return (
    <Popup
      tipSize={5}
      anchor="top"
      longitude={popupInfo.longitude}
      latitude={popupInfo.latitude}
      closeOnClick={false}
      onClose={onClose}
    >
      <>
        <Text fontSize={3} color={theme.colors.grays[9]} fontWeight="bold" textAlign="center">
          {popupInfo.title}
        </Text>
        <Text fontSize={3} color={theme.colors.grays[7]} p={0}>
          {popupInfo.subtitle}
        </Text>
      </>
    </Popup>
  );
}

export default MapPopup;
