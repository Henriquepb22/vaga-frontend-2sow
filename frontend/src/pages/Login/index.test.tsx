import { renderWithTheme } from 'utils/tests/helpers'
import { screen } from '@testing-library/dom'

import Login from '.'

describe('<Login />', () => {
    it('should render login page with login form', () => {
        renderWithTheme(<Login />)

        expect(screen.getByRole('form')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /entrar/i })
        ).toBeInTheDocument()
    })
})
