import styled from 'styled-components';
import Flex from '@src/components/base/Grid/Flex';

const Footer = styled(Flex)`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: rgba(10, 10, 10, 0.7);
  z-index: 100;

  color: ${props => props.theme.colors.common.white};
  ${props => props.theme.Footer};
`;

Footer.defaultProps = {
  padding: 3,
  justifyContent: 'center',
  alignItems: 'center',
};

export default Footer;
