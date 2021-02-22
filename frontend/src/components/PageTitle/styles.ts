import styled, { css } from 'styled-components'

export const PageTitle = styled.h2`
    ${({ theme }) => css`
        color: ${theme.colors.secondary};
        font-size: ${theme.font.sizes.xlarge};
        margin-bottom: ${theme.spacings.large};
    `}
`
