import { AuthContext, AuthContextProps } from 'contexts/AuthContext'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderWithTheme } from 'utils/tests/helpers'
import { screen } from '@testing-library/dom'

import Wrapper from '.'

describe('<Wrapper />', () => {
    it('should render wrapper with header and passed children', () => {
        renderWithTheme(
            <Wrapper>
                <span>Children</span>
            </Wrapper>
        )

        expect(screen.getByText(/children/i)).toBeInTheDocument()
        expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('should render two nav links if user is authenticated', () => {
        const value: AuthContextProps = {
            authenticated: true,
            token: 'ASD123ASD',
            handleLogin: jest.fn(),
            handleLogout: jest.fn()
        }

        renderWithTheme(
            <Router>
                <AuthContext.Provider value={value}>
                    <Wrapper>
                        <span>children</span>
                    </Wrapper>
                </AuthContext.Provider>
            </Router>
        )

        expect(screen.getByRole('navigation')).toBeInTheDocument()
        expect(screen.getByRole('navigation').childNodes).toHaveLength(3)
    })
})
