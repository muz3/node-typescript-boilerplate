import {
  borders,
  borderColor,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  backgroundRepeat,
  opacity,
  BordersProps,
  BorderColorProps,
  BackgroundImageProps,
  BackgroundSizeProps,
  BackgroundPositionProps,
  BackgroundRepeatProps,
  OpacityProps,
} from 'styled-system';
import styled from 'styled-components';
import Box, { Props as BoxProps } from '@src/components/base/Grid/Box';

export type Props = BoxProps &
  BordersProps &
  BorderColorProps &
  BackgroundImageProps &
  BackgroundSizeProps &
  BackgroundPositionProps &
  BackgroundRepeatProps &
  OpacityProps;

export const Card = styled(Box)<Props>`
  ${borders}
  ${borderColor}
  ${backgroundImage}
  ${backgroundSize}
  ${backgroundPosition}
  ${backgroundRepeat}
  ${opacity}
  ${props => props.theme.Card}
`;

Card.defaultProps = {
  boxShadow: 1,
  borderRadius: 2,
};

export default Card;
