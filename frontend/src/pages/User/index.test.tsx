import { BrowserRouter as Router } from 'react-router-dom'
import { renderWithTheme } from 'utils/tests/helpers'
import { screen } from '@testing-library/react'

import User from '.'

describe('<User />', () => {
    it('should render User page', () => {
        renderWithTheme(
            <Router>
                <User />
            </Router>
        )

        expect(
            screen.getByRole('heading', { name: /novo usuário/i })
        ).toBeInTheDocument()
        expect(screen.getByRole('form')).toBeInTheDocument()
    })
})
