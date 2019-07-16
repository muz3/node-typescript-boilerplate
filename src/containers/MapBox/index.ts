import { connect } from 'react-redux';

import MapBox from '@src/components/MapBox';
import { RootState } from '@src/store';
import { fetchOriginOperation } from './operations';
import { setViewport } from './actions';
import { mapStyleSelector, getDeliveringOrders } from './selectors';

const mapStateToProps = (state: RootState) => ({
  ...state.mapbox,
  mapStyle: mapStyleSelector(state),
  deliveringOrders: getDeliveringOrders(state),
});

const mapDispatchToProps = {
  fetchOriginOperation,
  setViewport,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapBox);
