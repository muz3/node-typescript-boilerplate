import request from '@src/utils/request';
import { lineString, Feature } from '@turf/helpers';
import turfLength from '@turf/length';
import { decode } from '@mapbox/polyline';

import { StringAnyMap } from '@src/types/utils';
import { MAPBOX_API_URL } from './constants';

const ACCESS_TOKEN = process.env.MapboxAccessToken;
const POLYLINE_PRECISION = 5;
const SECONDS_IN_HOUR = 3600;
const SPEED_BASE = 20;

/**
 * Fetch driving route from origin to destination
 *
 * @param origin
 * @param destination
 */
export async function fetchDrivingRoute(origin: [number, number], destination: [number, number]) {
  const baseUrl = `${MAPBOX_API_URL}/directions/v5/mapbox/driving-traffic`;
  const coordinates = `${origin.join(',')};${destination.join(',')}`;
  const url = `${baseUrl}/${coordinates}?steps=true&overview=full&access_token=${ACCESS_TOKEN}`;
  const data = await request(url);
  return data.routes[0];
}

/**
 * Given any address, find the geocoding
 * @param address
 */
export async function fetchGeocoding(address: string) {
  const url = `${MAPBOX_API_URL}/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${ACCESS_TOKEN}`;
  const data = await request(url);
  return data.features[0].center;
}

/**
 * Generate a speed between 20 to 25 miles per hour
 * @returns miles per second
 */
export function generateRandomSpeed() {
  return (Math.random() * 5 + SPEED_BASE) / SECONDS_IN_HOUR;
}

/**
 * Decode geometry and return geojson route
 * @param geometry
 * @returns geojson lineString
 */
export function createRouteFromGeometry(geometry: string, options?: StringAnyMap) {
  const decoded = decode(geometry, POLYLINE_PRECISION).map(c => {
    return c.reverse();
  });

  return lineString(decoded, options);
}

/**
 * Given a route, calculate the distance of it
 * @param route
 * @returns distance in miles
 */
export function calculateRouteLength(route: Feature) {
  return turfLength(route, { units: 'miles' });
}
