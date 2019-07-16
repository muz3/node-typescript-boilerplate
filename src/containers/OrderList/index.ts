import { connect } from 'react-redux';

import { RootState } from '@src/store';
import OrderList from '@src/components/OrderList';
import { moveCamera } from '@src/containers/MapBox/actions';
import { startSimulatingOrders } from './operations';

const mapStateToProps = (state: RootState) => ({
  ...state.orderList,
});

const mapDispatchToProps = {
  startSimulatingOrders,
  moveCamera,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList);
