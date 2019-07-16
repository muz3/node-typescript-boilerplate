import { createSelector } from 'reselect';
import { featureCollection } from '@turf/helpers';

import { RootState } from '@src/store';
import { MAPBOX_SOURCE_NAME } from './constants';
import { mapStyle } from './styles';

export const getDeliveringOrders = (state: RootState) => state.orderList.delivering;

export const getDeliveringGeoFeatures = (state: RootState) =>
  state.mapbox.deliverSimulationGeoFeatures;

/**
 * Based on deliveringOrders and deliveringGeoFeatures, create a source which
 * can be consumed by MapboxGL
 * We don't want this data to be in redux because otherwise it
 * will be duplicated data with deliverSimulationGeoFeatures.
 */
export const sourceSelector = createSelector(
  getDeliveringOrders,
  getDeliveringGeoFeatures,
  (orders, features) => ({
    type: 'geojson',
    data: featureCollection([...orders.map(order => order.route), ...features]),
  })
);

/**
 * select mapStyle, we only update sources in the style
 * mapStyle is never stored in redux because:
 * 1. it's too big
 * 2. the majority part of the data never change
 * So we only update part of the mapStyle when needed.
 */
export const mapStyleSelector = createSelector(
  sourceSelector,
  source => ({
    ...mapStyle,
    sources: {
      ...mapStyle.sources,
      [MAPBOX_SOURCE_NAME]: source,
    },
  })
);
