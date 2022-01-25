import styled, {DefaultTheme} from "styled-components";
import {layout, space, variant} from "styled-system";
import {scaleVariants, styleVariants} from "./theme";
import {BaseButtonProps} from "./types";

interface ThemedButtonProps extends BaseButtonProps {
    theme: DefaultTheme;
}

interface TransientButtonProps extends ThemedButtonProps {
    $isLoading?: boolean;
    className?: string;
}

const getDisabledStyles = ({$isLoading, theme}: TransientButtonProps) => {
    if ($isLoading === true) {
        return `
      &:disabled,
      &.pancake-button--disabled {
        cursor: not-allowed;
        background-image: ${getBg};
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      }
    `;
    }

    return `
    &:disabled,
    &.pancake-button--disabled {
      background-color: ${theme.colors.backgroundDisabled};
      border-color: ${theme.colors.backgroundDisabled};
      box-shadow: none;
      color: ${theme.colors.textDisabled};
      cursor: not-allowed;
      opacity: 0.5;
      background-image: ${getBg};
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  `;
};

/**
 * This is to get around an issue where if you use a Link component
 * React will throw a invalid DOM attribute error
 * @see https://github.com/styled-components/styled-components/issues/135
 */

const getOpacity = ({$isLoading = false}: TransientButtonProps) => {
    return $isLoading ? ".5" : "1";
};
const getBg = ({className}: TransientButtonProps) => {
    return className.includes("bg-img") ? "url('images/btn-bg.svg')" : "unset"
};

const StyledButton = styled.button<BaseButtonProps>`
  align-items: center;
  border: 0;
  border-radius: 16px;
  box-shadow: 0px -1px 0px 0px rgba(14, 14, 44, 0.4) inset;
  cursor: pointer;
  display: inline-flex;
  font-family: 'Viserion';
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  letter-spacing: 0.03em;
  line-height: 1;
  opacity: ${getOpacity};
  outline: 0;
  /* background-image: ${getBg}; */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: background-color 0.2s, opacity 0.2s;
  position: relative;
  &.bg-img {
    &:before {
      content: "";
      /* background-image: url("../images/btn-bg-left.svg"); */
      height: 48px;
      width: 96px;
      position: absolute;
      left: 0;
      top: 0;
    }
    &:after {
      content: "";
      /* background-image: url("../images/btn-bg-right.svg"); */
      height: 48px;
      width: 96px;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  
  &:hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) {
    opacity: 0.65;
  }

  &:active:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled) {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }

  ${getDisabledStyles}
  ${variant({
    prop: "scale",
    variants: scaleVariants,
})}
  ${variant({
    variants: styleVariants,
})}
  ${layout}
  ${space}
`;

export default StyledButton;
