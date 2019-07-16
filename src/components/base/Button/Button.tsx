import React, { HTMLAttributes } from 'react';
import {
  fontWeight,
  borders,
  borderColor,
  borderRadius,
  buttonStyle,
  color,
  FontWeightProps,
  BordersProps,
  BorderColorProps,
  BorderRadiusProps,
  ButtonStyleProps,
  ColorProps,
} from 'styled-system';
import styled, { StyledProps } from 'styled-components';
import Box, { Props as BoxProps } from '@src/components/base/Grid/Box';

export type Props = {
  variant?: 'default' | 'primary';
  disabled?: boolean;
  label?: string;
} & HTMLAttributes<HTMLDivElement> &
  FontWeightProps &
  BordersProps &
  BorderColorProps &
  BorderRadiusProps &
  ButtonStyleProps &
  BoxProps &
  ColorProps;

type ComponentProps = StyledProps<Props>;

function getCursorStyle(p: ComponentProps) {
  return `cursor: ${p.disabled ? 'not-allowed' : 'pointer'};`;
}

const variantStyle: { [key: string]: any } = {
  default: {
    default: (p: ComponentProps) => `
      border: 1px solid ${p.theme.colors.grays[5]};
      background-color: ${p.theme.colors.common.white};
      color: ${p.disabled ? p.theme.colors.disabled.main : p.theme.colors.common.black};
      ${getCursorStyle(p)}
    `,
    active: (p: ComponentProps) => `
      ${p.disabled ? '' : `background-color: ${p.theme.colors.grays[1]};`}
    `,
    hover: (p: ComponentProps) => `
      ${p.disabled ? '' : `background-color: ${p.theme.colors.grays[0]};`}
    `,
  },
  primary: {
    default: (p: ComponentProps) => `
      border: 1px solid ${p.disabled ? p.theme.colors.disabled.main : p.theme.colors.primary.main};
      background-color: ${p.disabled ? p.theme.colors.disabled.main : p.theme.colors.primary.main};
      color: ${p.disabled ? p.theme.colors.disabled.contrast : p.theme.colors.primary.contrast};
      ${getCursorStyle(p)}
    `,
    active: (p: ComponentProps) => `
      ${p.disabled ? '' : `opacity: 0.95;`}
    `,
    hover: (p: ComponentProps) => `
      ${p.disabled ? '' : `opacity: 0.85;`}
    `,
  },
};

function getStyles(props: ComponentProps, selector: string) {
  return variantStyle[props.variant || 'default'][selector];
}

export const Button: React.SFC<Props> = props => (
  <Box {...props}>
    <span>{props.children || props.label}</span>
  </Box>
);

Button.defaultProps = {
  as: 'button',
  variant: 'default',
  p: '6px 12px',
  label: 'Button',
  fontWeight: 700,
  fontSize: 3,
  display: 'inline-block',
};

export const StyledButton = styled(Button)<Props>`
  text-decoration: none;
  outline: none;

  span {
    display: inline-block;
  }
  ${p => getStyles(p, 'default')};
  &:hover {
    ${p => getStyles(p, 'hover')};
  }
  &:active {
    ${p => getStyles(p, 'active')};
  }
  &:focus {
    ${p => getStyles(p, 'focus')};
  }

  ${fontWeight}
  ${borders}
  ${borderColor}
  ${borderRadius}
  ${buttonStyle}
  ${color}
`;

StyledButton.displayName = 'Button';
StyledButton.defaultProps = {
  borderRadius: 2,
};

export default StyledButton;
