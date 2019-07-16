import styled, { StyledProps } from 'styled-components';
import { color, ColorProps } from 'styled-system';
import { ReactComponent as MarkerIcon } from '@src/assets/svg/marker.svg';

export type Props = ColorProps;
type ThemeProps = StyledProps<Props>;

export const StyledMarkerIcon = styled(MarkerIcon)`
  position: absolute;
  left: -14px; /* half of the size */
  top: -35px; /* move the icon to top */
  color: ${(p: ThemeProps) => p.theme.colors.primary.main};
  cursor: pointer;
  ${color}
`;

export default StyledMarkerIcon;
