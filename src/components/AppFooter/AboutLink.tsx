import React from 'react';
import styled, { StyledProps } from 'styled-components';
import { NavLink } from 'react-router-dom';

function AboutLink(props: StyledProps<{}>) {
  return (
    <NavLink {...props} to="/about">
      About
    </NavLink>
  );
}

export const StyledAboutLink = styled(AboutLink)`
  text-decoration: none;
  color: ${p => p.theme.colors.common.white};

  &:hover {
    text-decoration: underline;
  }
`;

export default StyledAboutLink;
