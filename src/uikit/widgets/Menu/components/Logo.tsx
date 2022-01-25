import React from "react";
import {Link} from "react-router-dom";
import styled, {keyframes} from "styled-components";
import Flex from "../../../components/Box/Flex";
import {HamburgerCloseIcon, HamburgerIcon} from "../icons";
import MenuButton from "./MenuButton";

interface Props {
    isPushed: boolean;
    isDark: boolean;
    togglePush: () => void;
    href: string;
}

const blink = keyframes`
  0%,  100% { transform: scaleY(1); } 
  50% { transform:  scaleY(0.1); } 
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  .mobile-icon {
    width: 150px;
    ${({theme}) => theme.mediaQueries.nav} {
      display: none;
    }
  }
  .desktop-icon {
    width: 160px;
    display: none;
    ${({theme}) => theme.mediaQueries.nav} {
      display: block;
    }
  }
  .right-eye {
    animation-delay: 20ms;
  }
  &:hover {
    .left-eye,
    .right-eye {
      transform-origin: center 60%;
      animation-name: ${blink};
      animation-duration: 350ms;
      animation-iteration-count: 1;
    }
  }
`;

const Logo: React.FC<Props> = ({isPushed, togglePush, isDark, href}) => {
    const isAbsoluteUrl = href.startsWith("http");
    const innerLogo = (
        <>
            {/*<img src="../../logo-full.png" alt="logo" width="150px" className="mobile-icon"/>*/}
            {/*<img src="../../logo-full.png" alt="logo" width="140px" className="desktop-icon"/>*/}
        </>
    );

    return (
        <Flex>
            <MenuButton aria-label="Toggle menu" onClick={togglePush} mr="24px">
                {isPushed ? (
                    <HamburgerCloseIcon width="24px" color="textSubtle"/>
                ) : (
                    <HamburgerIcon width="24px" color="textSubtle"/>
                )}
            </MenuButton>
            {isAbsoluteUrl ? (
                // <StyledLink as="a" href={href} aria-label="Pancake home page">
                //   {innerLogo}
                // </StyledLink>
                <StyledLink to={href} aria-label="VeFI home page">
                    {innerLogo}
                </StyledLink>
            ) : (
                <StyledLink to={href} aria-label="VeFI home page">
                    {innerLogo}
                </StyledLink>
            )}
        </Flex>
    );
};

export default React.memo(Logo, (prev, next) => prev.isPushed === next.isPushed && prev.isDark === next.isDark);
