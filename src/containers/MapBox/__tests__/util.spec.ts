import {
  createRouteFromGeometry,
  generateRandomSpeed,
  calculateRouteLength,
} from '@src/containers/MapBox/utils';
import { fixtureData1 } from './__fixture__/geojson';

describe('MapGL Utils', () => {
  describe('#generateRandomSpeed', () => {
    it('should generate speed between 20 to 25', () => {
      // we calculate in hours
      const speed = generateRandomSpeed() * 3600;
      expect(speed).toBeGreaterThan(20);
      expect(speed).toBeLessThan(25);
    });
  });

  describe('#createRouteFromGeometry', () => {
    const route = createRouteFromGeometry(fixtureData1.geometry);
    expect(route).toEqual(fixtureData1.route);
  });

  describe('#calculateRouteLength', () => {
    const length = calculateRouteLength(fixtureData1.route);
    expect(length).toEqual(fixtureData1.length);
  });
});
