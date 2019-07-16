import styled from 'styled-components';

import Box from '@src/components/base/Grid/Box';

export const ListItem = styled(Box)`
  &:hover {
    background-color: ${p => p.theme.colors.hover.main};
  }

  list-style-type: none;
  cursor: pointer;
`;

ListItem.defaultProps = {
  as: 'li',
};

export default ListItem;
