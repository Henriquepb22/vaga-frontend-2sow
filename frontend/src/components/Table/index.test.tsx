import { renderWithTheme } from 'utils/tests/helpers'
import { screen } from '@testing-library/react'
import mockTableData from './mock'

import Table, { BodyProps } from '.'

const columns = [
    {
        title: 'Nome'
    },
    {
        title: 'CPF'
    }
]

describe('<Table />', () => {
    it('should render table with columns', () => {
        renderWithTheme(<Table columns={columns} body={[]} />)

        const table = screen.getByRole('table')
        const header = screen.getByText(/nome/i).parentElement
        expect(table).toBeInTheDocument()
        expect(header).toBeInTheDocument()
        expect(header?.childNodes).toHaveLength(columns.length)
    })

    it('should render table with body data', () => {
        const getMockTableData: BodyProps[] = mockTableData.map(
            ({ id, name, document }) => {
                return {
                    id,
                    content: [name, document]
                }
            }
        )
        renderWithTheme(<Table columns={columns} body={getMockTableData} />)

        const table = screen.getByRole('table')
        const body = screen.getAllByRole('rowgroup')[1]
        expect(table).toBeInTheDocument()
        expect(body.childNodes).toHaveLength(mockTableData.length)
    })
})
