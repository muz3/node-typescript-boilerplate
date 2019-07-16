import lineSliceAlong from '@turf/line-slice-along';
import { point } from '@turf/helpers';

import { ThunkResult } from '@src/store';
import { DeliveringOrder, PendingOrder } from '@src/containers/OrderList/types';
import {
  startDeliveringOrder,
  fetchDestinationAction,
  orderDelivered,
} from '@src/containers/OrderList/actions';
import {
  fetchOriginGeocodingAction,
  setDeliverSimulationStarted,
  setDeliverGeoFeatures,
} from './actions';
import { DEFAULT_ORIGIN, ANIMATION_INTERVAL } from './constants';
import {
  fetchGeocoding,
  fetchDrivingRoute,
  generateRandomSpeed,
  createRouteFromGeometry,
  calculateRouteLength,
} from './utils';
import { SimulationGeoFeature } from '@src/containers/MapBox/types';

/**
 * @param address A query string of address
 */
export function fetchOriginOperation(address = DEFAULT_ORIGIN.address): ThunkResult<void> {
  return async function(dispatch) {
    const { request, success, failure } = fetchOriginGeocodingAction;
    dispatch(request());
    try {
      const coordinates = await fetchGeocoding(address);
      dispatch(
        success({
          address,
          coordinates,
        })
      );
    } catch (e) {
      dispatch(failure(e));
    }
  };
}

/**
 * Send API request to fetch pendingOrder's geo infomation,
 * then send an action to start delivering order.
 * If simulation is not started, start simulation.
 */
export function fetchDestinationOperation({
  dispatchTime,
  ...order
}: PendingOrder): ThunkResult<void> {
  return async function(dispatch, getState) {
    const {
      mapbox: { origin, deliverSimulationStarted },
    } = getState();
    dispatch(fetchDestinationAction.request());
    try {
      // fetch coordinates first, then fetch driving route info
      const coordinates = await fetchGeocoding(order.destination);
      const { geometry } = await fetchDrivingRoute(origin.coordinates, coordinates);
      const route = createRouteFromGeometry(geometry, {
        id: `route-${order.id}`,
        route: 'destination',
      });

      const deliveringOrder: DeliveringOrder = {
        ...order,
        coordinates,
        route,
        startTime: new Date(),
        speed: generateRandomSpeed(),
        distance: calculateRouteLength(route),
      };

      // start simulation if not started
      if (!deliverSimulationStarted) {
        dispatch(startSimulatingDeliver());
      }

      dispatch(startDeliveringOrder(deliveringOrder));
    } catch (e) {
      dispatch(fetchDestinationAction.failure(e));
    }
  };
}

/**
 * startSimulatingDeliver
 */
export function startSimulatingDeliver(): ThunkResult<void> {
  return function(dispatch, getState) {
    // do nothing if it's already started
    if (getState().mapbox.deliverSimulationStarted) {
      return;
    }

    dispatch(setDeliverSimulationStarted(true));

    /**
     * Notice: To have a even smoothier animation,
     * we could use requestAnimationFrame.
     * However, that consume much more CPU/GPU, I'll keep it simple here.
     */
    const interval = setInterval(() => {
      const {
        orderList: { delivering, pending },
      } = getState();

      const features: SimulationGeoFeature[] = [];
      delivering.forEach(order => {
        const { id, name, speed, startTime, route, distance } = order;

        const traveledDistance = speed * ((Date.now() - startTime.valueOf()) / 1000);

        // Use traveledDistance, calculate current route
        const currentRoute = lineSliceAlong(route, 0, traveledDistance, { units: 'miles' });
        currentRoute.properties = {
          ...currentRoute.properties,
          id: `current-route-${id}`,
          route: 'current',
        };

        if (currentRoute.geometry !== null) {
          // the position of courier should be the last point of currentRoute
          const lastCoordinate = currentRoute.geometry.coordinates.slice(-1)[0];
          const currentPoint = point(lastCoordinate, {
            name,
            id: `current-point-${id}`,
          });

          // push point/route to features
          features.push(currentPoint, currentRoute);
        }

        // dispatch orderDelivered when travel distance is greater than
        // destination distance
        if (traveledDistance >= distance) {
          dispatch(
            orderDelivered({
              ...order,
              endTime: new Date(),
            })
          );
        }
      });

      // dispatch geo features
      if (features.length) {
        dispatch(setDeliverGeoFeatures(features));
      }

      // when there's no more pending, and delivering,
      // stop simulation
      if (!pending.length && !delivering.length) {
        clearInterval(interval);
      }
    }, ANIMATION_INTERVAL);
  };
}
