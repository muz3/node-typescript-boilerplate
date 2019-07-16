import React from 'react';
import Flex from '@src/components/base/Grid/Flex';
import MapBox from '@src/containers/MapBox';
import OrderList from '@src/containers/OrderList';

const Home = () => (
  <Flex padding={0} height="100vh">
    <MapBox flex="1 0 0%" />
    <OrderList flex="0 0 350px" />
  </Flex>
);

export default Home;
