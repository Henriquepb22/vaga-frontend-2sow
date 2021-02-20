import { screen } from '@testing-library/dom'
import { Login } from '@styled-icons/material-outlined/Login'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderWithTheme } from 'utils/tests/helpers'

import Header, { HeaderProps } from '.'

const props: HeaderProps = {
    title: 'Cadastro',
    links: [
        {
            linkTo: '/',
            icon: <Login />,
            label: 'login'
        }
    ]
}

describe('<Header />', () => {
    it('should render header without navbar items', () => {
        renderWithTheme(<Header title="cadastro" />)

        expect(
            screen.getByRole('heading', { name: /cadastro/i })
        ).toBeInTheDocument()
        expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
    })

    it('should render header with navbar items', () => {
        renderWithTheme(
            <Router>
                <Header {...props} />
            </Router>
        )

        expect(
            screen.getByRole('heading', { name: /cadastro/i })
        ).toBeInTheDocument()
        expect(screen.getByRole('navigation').children).toHaveLength(1)
    })
})
