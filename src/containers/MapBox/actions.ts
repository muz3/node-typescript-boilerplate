import { ViewState } from 'react-map-gl';
import { ActionType, createAsyncAction, createStandardAction } from 'typesafe-actions';
import { MapboxState, SimulationGeoFeature } from './types';

/**
 * Three actions for sending request to fetch geocoding
 * request, success, failure
 */
export const fetchOriginGeocodingAction = createAsyncAction(
  '@@MapBox/FETCH_ORIGIN_GEOCODING_REQUEST',
  '@@MapBox/FETCH_ORIGIN_GEOCODING_SUCCESS',
  '@@MapBox/FETCH_ORIGIN_GEOCODING_FAILURE'
)<undefined, MapboxState['origin'], Error>();

/**
 * Action to set map viewport
 */
export const setViewport = createStandardAction('@@MapBox/SET_VIEWPORT')<ViewState>();

/**
 * Action to set deliverSimulationStarted, indicating if simulation has started
 */
export const setDeliverSimulationStarted = createStandardAction(
  '@@MapBox/SET_DELIVER_SIMULATION_STARTED'
)<boolean>();

/**
 * Action to set current deliver simulation's geo features,
 * including routes and points (showing the small car)
 */
export const setDeliverGeoFeatures = createStandardAction('@@MapBox/SET_DELIVER_GEO_FEATURES')<
  SimulationGeoFeature[]
>();

/**
 * Move camera to a courier
 */
export const moveCamera = createStandardAction('@@MapBox/MOVE_CAMERA')<string>();

export type MapboxAction =
  | ActionType<typeof fetchOriginGeocodingAction>
  | ActionType<typeof setViewport>
  | ActionType<typeof setDeliverSimulationStarted>
  | ActionType<typeof setDeliverGeoFeatures>
  | ActionType<typeof moveCamera>;
