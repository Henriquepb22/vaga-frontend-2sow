import styled, { css, DefaultTheme } from 'styled-components'

type WrapperProps = {
    error: boolean
}

export const Label = styled.label`
    ${({ theme }) => css`
        font-size: ${theme.font.sizes.large};
        cursor: pointer;
    `}
`

export const InputWrapper = styled.div`
    ${({ theme }) => css`
        display: flex;
        margin-top: ${theme.spacings.xxsmall};
        border: 1px solid ${theme.colors.lightGrey};
        border-radius: 4px;
        background: ${theme.colors.white};
        padding: ${theme.spacings.small} ${theme.spacings.medium};

        &:focus-within {
            box-shadow: 0 0 0.6rem ${theme.colors.primary};
        }
    `}
`

export const Input = styled.input`
    ${({ theme }) => css`
        background: transparent;
        padding: 0 ${theme.spacings.xsmall};
        border: 0;
        outline: none;
        width: 100%;
        color: ${theme.colors.black};
        font-size: ${theme.font.sizes.medium};

        &::placeholder {
            color: ${theme.colors.secondary};
        }
    `}
`

export const Icon = styled.div`
    ${({ theme }) => css`
        display: flex;
        color: ${theme.colors.primary};
        width: 2rem;

        & > svg {
            width: 100%;
        }
    `}
`

export const Error = styled.p`
    ${({ theme }) => css`
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
    `
}

export const Wrapper = styled.div<WrapperProps>`
    ${({ theme, error }) => css`
        ${!!error && wrapperModifiers.error(theme)}
    `}
`
