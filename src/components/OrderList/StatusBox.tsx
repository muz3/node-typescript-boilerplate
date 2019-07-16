import React, { useState } from 'react';

import { grays, colors } from '@src/theme';
import Heading from '@src/components/base/Typography/Heading';
import Text from '@src/components/base/Typography/Text';
import Flex from '@src/components/base/Grid/Flex';
import List from '@src/components/base/List/List';
import ListItem from '@src/components/base/List/ListItem';
import Button from '@src/components/base/Button/Button';
import Card, { Props as CardProps } from '@src/components/base/Card/Card';

export type Order = {
  id: string;
  name: string;
  startTime?: Date;
  dispatchTime?: number;
  endTime?: Date;
};
export type Props = {
  name: string;
  orders: Order[];
  limit: number;
  moveCamera?: (id: string) => void;
} & CardProps;

/**
 * Get description based on order data
 * @param order
 */
function getDescription(order: Order) {
  let description = '';
  if (order.dispatchTime) {
    description = `dispatch in ${order.dispatchTime} seconds`;
  } else if (order.endTime && order.startTime) {
    const timeUsed = Math.round((order.endTime.valueOf() - order.startTime.valueOf()) / 60000);
    description = `delivered at ${order.endTime.toLocaleTimeString()} (~ ${timeUsed} mins)`;
  } else if (order.startTime) {
    description = `dispatch started at ${order.startTime.toLocaleTimeString()}`;
  }
  return description;
}

/**
 * Render StatusBox, showing all the order details in this status
 */
export function StatusBox({ name, orders, limit, color, ...props }: Props) {
  // when orders are too much, we want to show a showMore button
  const [showAll, setShowAll] = useState(false);
  const needShowMore = orders.length > limit;

  // when orders exceed limit and showAll is false, we only show limited orders,
  // otherwise, we show all orders
  const showingOrders = needShowMore && !showAll ? orders.slice(0, limit) : orders;

  function handleShowMoreClick() {
    setShowAll(!showAll);
  }

  function handleListItemClick(id: string) {
    return () => {
      if (props.moveCamera) {
        props.moveCamera(`current-point-${id}`);
      }
    };
  }

  return (
    <Card {...props}>
      <Heading>{name}</Heading>
      <List>
        {showingOrders.length ? (
          showingOrders.map((order, index) => (
            <ListItem key={index} onClick={handleListItemClick(order.id)}>
              <Text padding={0} fontSize={3}>
                {order.name}
              </Text>
              <Text textAlign="right" fontSize={2} padding={0} color={grays[7]}>
                {getDescription(order)}
              </Text>
            </ListItem>
          ))
        ) : (
          <Text fontSize={3} color={grays[7]}>
            No {name} orders
          </Text>
        )}
      </List>
      {needShowMore ? (
        <Flex justifyContent="center">
          <Button onClick={handleShowMoreClick} border={0} color={colors.primary.main}>
            {showAll ? 'Show Less' : 'Show More'}
          </Button>
        </Flex>
      ) : null}
    </Card>
  );
}

StatusBox.defaultProps = {
  limit: 5,
  marginBottom: 2,
  padding: 0,
  paddingTop: 2,
};

export default StatusBox;
