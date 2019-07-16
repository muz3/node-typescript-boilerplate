/**
 * Global Style Sheet
 */
import { createGlobalStyle } from 'styled-components';
import { theme } from '@src/theme';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${theme.fonts.font};
  }
`;

export default GlobalStyle;
