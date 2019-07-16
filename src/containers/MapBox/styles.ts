import BASE_MAP_STYLE from '@src/data/mapbox-style-streets-v11.json';
import { MAPBOX_SOURCE_NAME } from './constants';
import { colors } from '@src/theme';

/**
 * A map style inherit from streets-v11, while adding our own layers
 */
export const mapStyle = {
  ...BASE_MAP_STYLE,
  layers: [
    ...BASE_MAP_STYLE.layers,
    {
      // layer for destination route, colored in gray,
      // indicating where the courier should go
      id: 'ck-route-layer',
      source: MAPBOX_SOURCE_NAME,
      type: 'line',
      paint: {
        'line-width': 2,
        'line-color': colors.grays[5],
        'line-opacity': 0.5,
      },
      filter: ['all', ['in', '$type', 'LineString'], ['in', 'route', 'destination']],
    },
    {
      // layer for courier's current route, colored in blue
      id: 'ck-current-route',
      source: MAPBOX_SOURCE_NAME,
      type: 'line',
      paint: {
        'line-color': colors.common.blue,
        'line-width': 2,
      },
      filter: ['all', ['in', '$type', 'LineString'], ['in', 'route', 'current']],
    },
    {
      // layer for courier itself, show as a car, with text-field showing the
      // name of the food
      id: 'ck-current-point',
      source: MAPBOX_SOURCE_NAME,
      type: 'symbol',
      layout: {
        'icon-image': 'car-15',
        'icon-rotate': ['get', 'bearing'],
        'icon-rotation-alignment': 'map',
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
        'text-field': ['get', 'name'],
        'text-size': 12,
        'text-offset': [0, -1.5],
        'text-allow-overlap': true,
      },
      paint: {
        'text-color': '#202',
        'text-halo-color': '#fff',
        'text-halo-width': 2,
      },
      filter: ['all', ['in', '$type', 'Point']],
    },
  ],
};
