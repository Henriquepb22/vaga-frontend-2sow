import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.main``

export const LoginBox = styled.div`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: ${theme.spacings.xxlarge} ${theme.spacings.xxlarge};
        background-color: ${theme.colors.white};
        max-width: 55rem;
        margin: 0 auto;
        border-radius: ${theme.radius.medium};
    `}
`

export const LoginText = styled.h2`
    ${({ theme }) => css`
        margin-top: ${theme.spacings.medium};
        font-size: ${theme.font.sizes.xlarge};
        color: ${theme.colors.secondary};
    `}
`

export const LoginInfo = styled.h3`
    ${({ theme }) => css`
        margin-top: ${theme.spacings.medium};
        font-size: ${theme.font.sizes.medium};
        color: ${theme.colors.lightBlue};
        font-weight: ${theme.font.normal};
    `}
`

export const FormContainer = styled.form`
    ${({ theme }) => css`
        width: 100%;
        padding: ${theme.spacings.medium};
        display: flex;
        flex-direction: column;
        margin-top: ${theme.spacings.xlarge};

        > *:not(:last-child) {
            margin-bottom: ${theme.spacings.large};
        }

        ${media.lessThan('medium')`
            padding: 0;
        `}
    `}
`
