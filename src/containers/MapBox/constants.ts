export const MAPBOX_API_URL = 'https://api.mapbox.com';
export const DEFAULT_ORIGIN = {
  name: 'Home',
  address: '1800 Marine Street, Santa Monica, CA 90405',
};

/**
 * source for mapbox, all our layers is sharing one source,
 * so it has better performance
 */
export const MAPBOX_SOURCE_NAME = 'react-starter-kit';

/**
 * Simulation animation interval
 * Technically using requestAnimationFrame can make animation smoothier,
 * but that consumes too much CPU/GPU, using an interval instead
 */
export const ANIMATION_INTERVAL = 500;
