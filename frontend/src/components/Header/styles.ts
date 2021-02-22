import styled, { css } from 'styled-components'
import media from 'styled-media-query'

import { NavLink as BaseNavLink } from 'react-router-dom'

export const Header = styled.header`
    ${({ theme }) => css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;
        height: 5rem;
        background-color: ${theme.colors.secondary};

        ${media.lessThan('medium')`
            height: 4rem;
            padding-right: 0;
        `}
    `}
`

export const Title = styled.h1`
    ${({ theme }) => css`
        color: ${theme.colors.white};
        font-size: ${theme.font.sizes.xxlarge};
        font-weight: ${theme.font.bold};

        ${media.lessThan('medium')`
            font-size: ${theme.font.sizes.xlarge};
        `}
    `}
`

export const Nav = styled.nav`
    display: flex;
`

export const NavLink = styled(BaseNavLink)`
    ${({ theme }) => css`
        display: flex;
        align-items: center;
        font-size: ${theme.font.sizes.large};
        padding: ${theme.spacings.xxsmall} ${theme.spacings.large};
        color: ${theme.colors.white};
        transition: opacity 0.3s ease-in;
        font-weight: ${theme.font.light};

        &:hover,
        &:active {
            opacity: 0.6;
        }

        > svg {
            margin-left: ${theme.spacings.xsmall};
            width: 2rem;
        }

        ${media.lessThan('medium')`
        padding: ${theme.spacings.xsmall};
    `}
    `}
`
