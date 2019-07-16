import { getType } from 'typesafe-actions';

import { MapboxState } from './types';
import {
  MapboxAction,
  fetchOriginGeocodingAction,
  setViewport,
  setDeliverSimulationStarted,
  setDeliverGeoFeatures,
  moveCamera,
} from './actions';
import { Feature, Point } from '@turf/helpers';

const defaultState: MapboxState = {
  origin: {
    address: '',
    coordinates: [0, 0],
  },
  viewport: {
    longitude: 0,
    latitude: 0,
    zoom: 11.5,
  },
  deliverSimulationStarted: false,
  deliverSimulationGeoFeatures: [],
};

export function mapboxReducer(state = defaultState, action: MapboxAction): MapboxState {
  switch (action.type) {
    case getType(fetchOriginGeocodingAction.success): {
      const [longitude, latitude] = action.payload.coordinates;
      return {
        ...state,
        origin: action.payload,
        viewport: {
          ...state.viewport,
          longitude,
          latitude,
        },
      };
    }
    case getType(setViewport): {
      // Note: this is needed, ReactMapGL will send width and height with the
      // viewport, in order to allow map resize properly when window resize,
      // we need to remove this width, height from payload
      const { width, height, ...viewport } = action.payload;
      return {
        ...state,
        viewport,
      };
    }
    case getType(setDeliverSimulationStarted):
      return {
        ...state,
        deliverSimulationStarted: action.payload,
      };
    case getType(setDeliverGeoFeatures):
      return {
        ...state,
        deliverSimulationGeoFeatures: action.payload,
      };
    case getType(moveCamera): {
      const courierPoint = state.deliverSimulationGeoFeatures.find(
        feature => feature.properties.id === action.payload
      ) as Feature<Point, any> | undefined;

      if (!courierPoint || !courierPoint.geometry) {
        return state;
      }
      const [longitude, latitude] = courierPoint.geometry.coordinates;
      return {
        ...state,
        viewport: {
          ...state.viewport,
          longitude,
          latitude,
        },
      };
    }
    default:
      return state;
  }
}
