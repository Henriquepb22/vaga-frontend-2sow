import { screen } from '@testing-library/dom'
import { renderWithTheme } from 'utils/tests/helpers'

import Users from '.'

describe('<Users />', () => {
    it('should render page title, filter input and table', () => {
        renderWithTheme(<Users />)

        expect(
            screen.getByRole('heading', { name: /usuários/i })
        ).toBeInTheDocument()
        expect(screen.getByRole('table')).toBeInTheDocument()
        expect(screen.getByLabelText(/buscar/i)).toBeInTheDocument()
    })
})
