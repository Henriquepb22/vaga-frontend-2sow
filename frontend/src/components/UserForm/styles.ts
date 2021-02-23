import styled, { css } from 'styled-components'

import * as Input from 'components/Input/styles'

export const FormBox = styled.form`
    ${({ theme }) => css`
        max-width: 80rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: ${theme.colors.white};
        margin: 4rem auto 0;
        border-radius: ${theme.radius.large};
        padding: ${theme.spacings.xlarge};
        transition: box-shadow ${theme.transition.fast};
        box-shadow: 3px 3px 0.6rem ${theme.colors.grey};

        &:hover,
        &:focus-within {
            box-shadow: 12px 12px 0.6rem ${theme.colors.grey};
        }
    `}
`

export const Row = styled.div`
    ${({ theme }) => css`
        display: flex;
        justify-content: center;
        width: 100%;
        margin-bottom: ${theme.spacings.large};

        > *:not(:last-child) {
            margin-right: ${theme.spacings.xxlarge};
        }

        ${Input.Wrapper} {
            width: 32.5rem;
        }
        ${Input.InputWrapper} {
            border-color: ${theme.colors.grey};
            border-radius: ${theme.radius.xlarge};
        }
        ${Input.Input} {
            border-radius: ${theme.spacings.large};
        }
    `}
`

export const ButtonContainer = styled.div`
    ${({ theme }) => css`
        margin-top: ${theme.spacings.large};
    `}
`
