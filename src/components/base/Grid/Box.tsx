import React from 'react';
import {
  space,
  color,
  width,
  height,
  flex,
  order,
  alignSelf,
  fontSize,
  display,
  border,
  borderBottom,
  borderLeft,
  borderRight,
  borderTop,
  borderRadius,
  boxShadow,
  overflow,
  SpaceProps,
  ColorProps,
  WidthProps,
  HeightProps,
  FlexProps,
  OrderProps,
  AlignSelfProps,
  FontSizeProps,
  DisplayProps,
  BorderProps,
  BorderBottomProps,
  BorderLeftProps,
  BorderRightProps,
  BorderTopProps,
  BorderRadiusProps,
  BoxShadowProps,
  OverflowProps,
} from 'styled-system';
import styled from 'styled-components';

export type Props = {
  css?: string;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
} & SpaceProps &
  ColorProps &
  WidthProps &
  HeightProps &
  FlexProps &
  OrderProps &
  AlignSelfProps &
  FontSizeProps &
  DisplayProps &
  BorderProps &
  BorderBottomProps &
  BorderLeftProps &
  BorderRightProps &
  BorderTopProps &
  BorderRadiusProps &
  BoxShadowProps &
  OverflowProps;

export const Box = styled.div<Props>`
  box-sizing: border-box;
  ${props => props.theme.Box}
  ${display}
  ${space}
  ${color}
  ${width}
  ${height}
  ${fontSize}
  ${flex}
  ${order}
  ${alignSelf}
  ${border}
  ${borderBottom}
  ${borderTop}
  ${borderLeft}
  ${borderRight}
  ${borderRadius}
  ${boxShadow}
  ${overflow}
  ${props => props.css}
`;

export default Box;
