import styled, { css } from 'styled-components'
import media from 'styled-media-query'

type TableRowProps = {
    columns: number
}

export const Wrapper = styled.table`
    ${({ theme }) => css`
        margin-top: ${theme.spacings.large};
        display: grid;
        grid-template-columns: auto;
        grid-template-areas:
            'table-header'
            'table-body';
    `}
`

export const TableHeader = styled.thead`
    ${({ theme }) => css`
        grid-area: table-header;
        font-size: ${theme.font.sizes.medium};
        font-weight: ${theme.font.bold};
        color: ${theme.colors.darkGrey};
    `}
`

export const TableHeaderData = styled.th`
    ${({ theme }) => css`
        text-align: left;
        padding: 0 ${theme.spacings.medium};
    `}
`

export const TableRow = styled.tr<TableRowProps>`
    ${({ columns }) => css`
        display: grid;
        grid-template-columns: repeat(${columns}, 1fr);
        align-items: center;
    `}
`

export const TableBody = styled.tbody`
    ${({ theme }) => css`
        grid-area: table-body;
        font-size: ${theme.font.sizes.medium};
        font-weight: ${theme.font.normal};
        color: ${theme.colors.black};

        > * {
            border: 1px solid ${theme.colors.grey};
            border-radius: ${theme.radius.medium};
            background-color: ${theme.colors.white};
            margin: ${theme.spacings.large} 0;
            box-shadow: 3px 3px 0.6rem ${theme.colors.grey};
            transition: box-shadow ${theme.transition.fast};

            &:hover,
            &:focus-within {
                box-shadow: 12px 12px 0.6rem ${theme.colors.grey};
            }
        }
    `}
`

export const TableData = styled.td`
    ${({ theme }) => css`
        padding: ${theme.spacings.large};

        ${media.lessThan('medium')`
            padding: ${theme.spacings.xsmall};
        `}
    `}
`
