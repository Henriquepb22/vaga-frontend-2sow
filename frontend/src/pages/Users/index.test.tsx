import { screen } from '@testing-library/dom'
import { renderWithTheme } from 'utils/tests/helpers'

import Users from '.'

describe('<Users />', () => {
    it('should render users page', () => {
        renderWithTheme(<Users />)

        expect(
            screen.getByRole('heading', { name: /usuários/i })
        ).toBeInTheDocument()
        expect(
            screen.getByPlaceholderText(/digite o nome/i)
        ).toBeInTheDocument()
    })
})
