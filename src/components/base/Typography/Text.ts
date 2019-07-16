import {
  fontFamily,
  fontWeight,
  textAlign,
  lineHeight,
  letterSpacing,
  FontFamilyProps,
  FontWeightProps,
  TextAlignProps,
  LineHeightProps,
  LetterSpacingProps,
} from 'styled-system';
import styled from 'styled-components';
import Box, { Props as BoxProps } from '@src/components/base/Grid/Box';
import { grays } from '@src/theme';

export type Props = BoxProps &
  FontFamilyProps &
  FontWeightProps &
  TextAlignProps &
  LineHeightProps &
  LetterSpacingProps;

const Text = styled(Box)<Props>`
  ${fontFamily}
  ${fontWeight}
  ${textAlign}
  ${lineHeight}
  ${letterSpacing}
  ${props => props.theme.Text}
`;

Text.defaultProps = {
  color: grays[9],
};

export default Text;
