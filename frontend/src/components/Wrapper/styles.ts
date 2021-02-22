import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
    ${({ theme }) => css`
        margin-bottom: ${theme.spacings.xxlarge};
    `}
`
