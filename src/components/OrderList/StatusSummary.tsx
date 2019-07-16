import React from 'react';

import { theme } from '@src/theme';
import Box from '@src/components/base/Grid/Box';
import Text from '@src/components/base/Typography/Text';
import Card from '@src/components/base/Card/Card';

export type Props = {
  statuses: { name: string; count: number }[];
};

/**
 * Render StatusSummary
 */
export function StatusSummary(props: Props) {
  // sum all statuses
  const total = props.statuses.reduce((acc, status) => {
    return acc + status.count;
  }, 0);

  return (
    <Card display="flex" padding={0} marginBottom={3}>
      {props.statuses.map((status, index) => (
        <Box key={index} flex="1 0 0" borderLeft={index && `1px solid ${theme.colors.grays[3]}`}>
          {/* status name */}
          <Text padding={0} fontSize={3} fontWeight="bold" textAlign="center" marginBottom={1}>
            {status.name}
          </Text>

          {/* status percentage */}
          <Text
            padding={0}
            fontSize={3}
            fontWeight="bold"
            textAlign="center"
            color={theme.colors.grays[8]}
            marginBottom={1}
          >
            {Math.round((1000 * status.count) / total) / 10}%
          </Text>

          {/* status order count */}
          <Text padding={0} fontSize={2} textAlign="center" color={theme.colors.grays[5]}>
            {status.count} orders
          </Text>
        </Box>
      ))}
    </Card>
  );
}

export default StatusSummary;
