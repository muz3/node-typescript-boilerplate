import { ViewState } from 'react-map-gl';
import { Feature, Point, LineString } from '@turf/helpers';

export type SimulationGeoFeature = Feature<Point, any> | Feature<LineString | null, any>;

export type MapboxState = {
  origin: {
    address: string;
    coordinates: [number, number];
  };
  viewport: ViewState;
  deliverSimulationStarted: boolean;

  /**
   * A collection of geo features to specify couriers' route
   * and location
   */
  deliverSimulationGeoFeatures: SimulationGeoFeature[];
};
