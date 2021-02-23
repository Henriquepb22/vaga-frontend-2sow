import styled, { css } from 'styled-components'
import media from 'styled-media-query'
import Button from 'components/Button'

export const Container = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 4rem;

    ${media.lessThan('medium')`
        width: 100%;
    `}
`

export const FiltersContainer = styled.div`
    ${({ theme }) => css`
        margin-bottom: ${theme.spacings.medium};
    `}
`

export const TableButtons = styled.div`
    ${({ theme }) => css`
        display: flex;
        justify-content: center;
        > *:not(:last-child) {
            margin-right: ${theme.spacings.small};
        }
    `}
`

export const RemoveButton = styled(Button)`
    ${({ theme }) => css`
        background-color: ${theme.colors.danger};
        padding: ${theme.spacings.small};
        border-radius: ${theme.radius.xlarge};
        &:hover,
        &:focus {
            box-shadow: 0 0 1.2rem ${theme.colors.danger};
        }
    `}
`

export const EditButton = styled(Button)`
    ${({ theme }) => css`
        background-color: ${theme.colors.green};
        padding: ${theme.spacings.small};
        border-radius: ${theme.radius.xlarge};
        &:hover,
        &:focus {
            box-shadow: 0 0 1.2rem ${theme.colors.green};
        }
    `}
`
