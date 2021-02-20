import { renderWithTheme } from 'utils/tests/helpers'
import { screen } from '@testing-library/react'

import LoginForm from '.'

describe('<LoginForm />', () => {
    it('should render the login form', () => {
        const onSubmit = jest.fn()
        renderWithTheme(<LoginForm onSubmit={onSubmit} />)

        expect(
            screen.getByRole('heading', { name: /bem vindo/i })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('heading', { name: /digite seus dados/i })
        ).toBeInTheDocument()
        expect(
            screen.getByPlaceholderText(/digite seu email/i)
        ).toBeInTheDocument()
        expect(
            screen.getByPlaceholderText(/digite sua senha/i)
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /entrar/i })
        ).toBeInTheDocument()
    })
})
