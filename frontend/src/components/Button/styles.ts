import styled, { css, DefaultTheme } from 'styled-components'
import { spin } from 'utils/styles/animations'

import { ButtonProps } from '.'

type WrapperProps = Pick<ButtonProps, 'size' | 'color' | 'isLoading'>

const wrapperModifiers = {
    primary: (theme: DefaultTheme) => css`
        background-color: ${theme.colors.primary};
    `,

    secondary: (theme: DefaultTheme) => css`
        background-color: ${theme.colors.secondary};
    `,

    normal: (theme: DefaultTheme) => css`
        height: 3.2rem;
        font-size: ${theme.font.sizes.medium};
    `,

    large: (theme: DefaultTheme) => css`
        height: 4.6rem;
        font-size: ${theme.font.sizes.large};
    `,

    isLoading: (theme: DefaultTheme) => css`
        pointer-events: none;
        opacity: 0.8;
        &::after {
            content: '';
            margin-left: ${theme.spacings.xsmall};
            width: 1.4rem;
            height: 1.4rem;
            border-radius: 50%;
            border: 3px solid ${theme.colors.lightGrey};
            animation: ${spin} 0.7s linear infinite;
            border-bottom-color: ${theme.colors.lightBlue};
        }
    `
}

export const Wrapper = styled.button<WrapperProps>`
    ${({ theme, size, color, isLoading }) => css`
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        width: 100%;
        border: 0;
        color: ${theme.colors.white};
        font-weight: ${theme.font.bold};
        transition: box-shadow 0.3s ease-in;

        &:hover,
        &:focus {
            cursor: pointer;
            box-shadow: 0 0 1.2rem
                ${color === 'primary'
                    ? theme.colors.primary
                    : theme.colors.secondary};
        }

        > svg {
            width: 2rem;

            & + span {
                margin-left: ${theme.spacings.xxsmall};
            }
        }
        ${!!size && wrapperModifiers[size](theme)}
        ${!!color && wrapperModifiers[color](theme)}
        ${!!isLoading && wrapperModifiers.isLoading(theme)}
    `}
`
