import styled, { css, DefaultTheme } from 'styled-components'
import { spin } from 'utils/styles/animations'

import { InputProps } from '.'

type WrapperProps = Pick<InputProps, 'isLoading'> & {
    error: boolean
}

export const Label = styled.label`
    ${({ theme }) => css`
        font-size: ${theme.font.sizes.small};
        cursor: pointer;
    `}
`

export const InputWrapper = styled.div`
    ${({ theme }) => css`
        display: flex;
        margin-top: ${theme.spacings.xxsmall};
        border: 2px solid ${theme.colors.lightGrey};
        border-radius: 10px;
        background: ${theme.colors.white};

        &:focus-within {
            box-shadow: 0 0 0.6rem ${theme.colors.primary};
        }
    `}
`

const inputModifiers = {
    normal: (theme: DefaultTheme) => css`
        padding: ${theme.spacings.small};
        font-size: ${theme.font.sizes.small};
    `,

    large: (theme: DefaultTheme) => css`
        padding: ${theme.spacings.large};
        font-size: ${theme.font.sizes.medium};
    `
}

export const Input = styled.input<Pick<InputProps, 'inputSize'>>`
    ${({ theme, inputSize }) => css`
        background: transparent;
        border: 0;
        outline: none;
        width: 100%;
        color: ${theme.colors.black};

        &::placeholder {
            color: ${theme.colors.secondary};
        }

        ${!!inputSize && inputModifiers[inputSize](theme)}
    `}
`

export const Icon = styled.div`
    ${({ theme }) => css`
        display: flex;
        align-items: center;
        color: ${theme.colors.primary};
        width: 2rem;
        margin-left: ${theme.spacings.medium};
        & > svg {
            width: 100%;
        }
    `}
`

export const Error = styled.p`
    ${({ theme }) => css`
        margin-top: ${theme.spacings.xxsmall};
        color: ${theme.colors.danger};
        font-size: ${theme.font.sizes.small};
    `}
`

const wrapperModifiers = {
    error: (theme: DefaultTheme) => css`
        ${InputWrapper} {
            border-color: ${theme.colors.danger};
        }
        ${Icon},
        ${Label} {
            color: ${theme.colors.danger};
        }
    `,
    isLoading: (theme: DefaultTheme) => css`
        opacity: 0.8;
        ${Icon} {
            & > svg {
                display: none;
            }
            &::after {
                content: '';
                width: 1.1rem;
                height: 1.1rem;
                border-radius: 50%;
                border: 3px solid ${theme.colors.primary};
                animation: ${spin} 0.7s linear infinite;
                border-bottom-color: ${theme.colors.white};
            }
        }
    `
}

export const Wrapper = styled.div<WrapperProps>`
    ${({ theme, error, isLoading }) => css`
        ${isLoading && wrapperModifiers.isLoading(theme)}
        ${!!error && wrapperModifiers.error(theme)};
    `}
`
