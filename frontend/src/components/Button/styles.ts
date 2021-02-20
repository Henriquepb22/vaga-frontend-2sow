import styled, { css, DefaultTheme } from 'styled-components'

import { ButtonProps } from '.'

type WrapperProps = Pick<ButtonProps, 'size' | 'color'>

const wrapperModifiers = {
    primary: (theme: DefaultTheme) => css`
        background-color: ${theme.colors.primary};
    `,

    secondary: (theme: DefaultTheme) => css`
        background-color: ${theme.colors.secondary};
    `,

    normal: (theme: DefaultTheme) => css`
        height: 3rem;
        font-size: ${theme.font.sizes.medium};
    `,

    large: (theme: DefaultTheme) => css`
        height: 4.6rem;
        font-size: ${theme.font.sizes.large};
    `
}

export const Wrapper = styled.button<WrapperProps>`
    ${({ theme, size, color }) => css`
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        width: 100%;
        border: 0;
        color: ${theme.colors.white};
        font-weight: ${theme.font.bold};
        transition: opacity 0.3s ease-in;

        &:hover {
            cursor: pointer;
            opacity: 0.8;
        }

        > svg {
            width: 2rem;

            & + span {
                margin-left: ${theme.spacings.xxsmall};
            }
        }
        ${!!size && wrapperModifiers[size](theme)}
        ${!!color && wrapperModifiers[color](theme)}
    `}
`
