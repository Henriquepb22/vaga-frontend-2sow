import styled, { css } from 'styled-components'
import media from 'styled-media-query'

import { NavLink as BaseNavLink } from 'react-router-dom'

export const Header = styled.header`
    ${({ theme }) => css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;
        height: 2.2rem;
        background-color: ${theme.colors.secondary};

        ${media.lessThan('medium')`
            height: 2rem;
            padding-right: 0;
        `}
    `}
`

export const Title = styled.h1`
    ${({ theme }) => css`
        color: ${theme.colors.white};
        font-size: ${theme.font.sizes.small};
        font-weight: ${theme.font.bold};

        ${media.lessThan('medium')`
            font-size: ${theme.font.sizes.xsmall};
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
        font-size: ${theme.font.sizes.xxsmall};
        padding: 0.4rem;
        color: ${theme.colors.white};
        transition: opacity 0.3s ease-in;
        font-weight: ${theme.font.light};

        &:hover,
        &:active {
            opacity: 0.6;
        }

        > svg {
            margin-left: 0.3rem;
            width: 1rem;
        }
    `}
`
