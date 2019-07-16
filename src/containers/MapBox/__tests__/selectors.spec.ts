import { RootState } from '@src/store';
import { createInitialState } from '@src/utils/test-helper';
import { sourceSelector, mapStyleSelector } from '@src/containers/MapBox/selectors';
import { delivering } from '@src/components/OrderList/__tests__/__fixture__/orders';
import { fixtureData1 } from '@src/containers/MapBox/__tests__/__fixture__/geojson';

const rootState = createInitialState();

describe('MapBox Selectors', () => {
  let state: RootState;
  beforeEach(() => {
    state = {
      ...rootState,
      orderList: {
        ...rootState.orderList,
        delivering,
      },
      mapbox: {
        ...rootState.mapbox,
        deliverSimulationGeoFeatures: [fixtureData1.route],
      },
    };
  });

  it('should select source correctly', () => {
    const source = sourceSelector(state);
    expect(source).toMatchSnapshot();
  });

  it('should select mapStyle correctly', () => {
    const mapStyle = mapStyleSelector(state);
    expect(mapStyle.sources).toMatchSnapshot();
  });
});
