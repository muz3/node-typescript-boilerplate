import React, { useEffect } from 'react';

import Flex, { Props as FlexProps } from '@src/components/base/Grid/Flex';
import Heading from '@src/components/base/Typography/Heading';
import StatusSummary from '@src/components/OrderList/StatusSummary';
import { DeliveredOrder, DeliveringOrder, PendingOrder } from '@src/containers/OrderList/types';
import StatusBox from '@src/components/OrderList/StatusBox';

export type Props = {
  pending: PendingOrder[];
  delivering: DeliveringOrder[];
  delivered: DeliveredOrder[];
  simulatingOrdersStarted: boolean;

  // operations
  startSimulatingOrders: () => void;
  // actions
  moveCamera?: (id: string) => void;
} & FlexProps;

/**
 * Render OrderList
 */
export function OrderList(props: Props) {
  // startSimulatingOrders when component is mounted
  useEffect(() => {
    if (!props.simulatingOrdersStarted) {
      props.startSimulatingOrders();
    }
  }, [] /* only execute once */);

  const { pending, delivering, delivered } = props;
  return (
    <Flex
      flex={props.flex}
      flexDirection="column"
      boxShadow={10}
      padding={3}
      overflow="auto"
      paddingBottom={5}
    >
      {/* Header */}
      <Heading as="h1" fontSize={5} textAlign="center" marginBottom={3}>
        Order Status
      </Heading>

      {/* A box with status summary */}
      <StatusSummary
        statuses={[
          {
            name: 'Pending',
            count: pending.length,
          },
          {
            name: 'In Route',
            count: delivering.length,
          },
          {
            name: 'Delivered',
            count: delivered.length,
          },
        ]}
      />

      <StatusBox name="Pending" orders={pending} />
      <StatusBox name="In Route" orders={delivering} moveCamera={props.moveCamera} />
      <StatusBox name="Delivered" orders={delivered} />
    </Flex>
  );
}

export default OrderList;
