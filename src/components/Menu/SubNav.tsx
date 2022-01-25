import React from 'react'
import styled from 'styled-components'
import {useLocation} from 'react-router-dom'

const StyledNav = styled.nav`
  margin-bottom: 40px;
`

const getActiveIndex = (pathname: string): number => {
    if (
        pathname.includes('/pool') ||
        pathname.includes('/create') ||
        pathname.includes('/add') ||
        pathname.includes('/remove') ||
        pathname.includes('/find') ||
        pathname.includes('/liquidity')
    ) {
        return 1
    }
    return 0
}

const Nav = () => {
    const location = useLocation()
    return (
        <StyledNav>
            {' '}
        </StyledNav>
    )
}
// const Nav = () => {
//   const location = useLocation()
//   return (
//     <StyledNav>
//       <ButtonMenu activeIndex={getActiveIndex(location.pathname)} scale="sm" variant="subtle">
//         <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link}>
//           Swap
//         </ButtonMenuItem>
//         <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
//           Liquidity
//         </ButtonMenuItem>
//       </ButtonMenu>
//     </StyledNav>
//   )
// }

export default Nav
