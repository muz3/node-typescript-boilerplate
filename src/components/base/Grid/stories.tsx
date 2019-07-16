import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import Box from './Box';
import Flex from './Flex';

const StyledBox = styled(Box)`
  opacity: 0.5;
`;

storiesOf('Components/base', module).add('Box', () => (
  <div>
    <Box borderRadius="10px" p={5} fontSize={4} width={[1, 1, 1 / 2]} color="black" bg="magenta">
      Box
    </Box>
    <Flex fontSize={2} p="10px" flexDirection="row">
      <Box border="1px solid black" width="30%" boxShadow={5}>
        box 1
      </Box>
      <Box border="1px solid black" width="70%" boxShadow={2}>
        box 2
      </Box>
      <StyledBox border="1px solid black" fontSize={1}>
        opacity
      </StyledBox>
    </Flex>
  </div>
));
