import {
  flexWrap,
  flexBasis,
  flexDirection,
  alignItems,
  justifyContent,
  FlexWrapProps,
  FlexBasisProps,
  FlexDirectionProps,
  flex,
  FlexProps,
  AlignItemsProps,
  JustifyContentProps,
} from 'styled-system';
import styled from 'styled-components';
import Box, { Props as BoxProps } from '@src/components/base/Grid/Box';

export type Props = BoxProps &
  FlexWrapProps &
  FlexBasisProps &
  FlexDirectionProps &
  FlexProps &
  AlignItemsProps &
  JustifyContentProps;

export const Flex = styled(Box)<Props>`
  display: flex;
  ${flexWrap}
  ${flexBasis}
  ${flexDirection}
  ${flex}
  ${alignItems}
  ${justifyContent}
`;

export default Flex;
