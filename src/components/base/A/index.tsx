import styled from 'styled-components';
import { color, ColorProps, space, SpaceProps } from 'styled-system';

export type Props = ColorProps & SpaceProps;

export const A = styled.a<Props>`
  text-decoration: none;
  ${space}
  ${color}

  &:hover {
    text-decoration: underline;
  }
`;

export default A;
