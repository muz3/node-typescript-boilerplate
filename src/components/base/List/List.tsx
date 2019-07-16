import styled from 'styled-components';

import Box from '@src/components/base/Grid/Box';

export const List = styled(Box)``;

List.defaultProps = {
  as: 'ul',
  paddingTop: 1,
  paddingBottom: 1,
  paddingLeft: 0,
  paddingRight: 0,
  margin: 0,
  boxShadow: 0,
};

export default List;
