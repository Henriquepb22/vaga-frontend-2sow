import { AuthContext, AuthContextProps } from 'contexts/AuthContext'
import { screen, waitFor } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import userEvent from '@testing-library/user-event'

import LoginForm from '.'

describe('<LoginForm />', () => {
    it('should render the login form', () => {
        renderWithTheme(<LoginForm />)

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

    it('should change form values on typing and submit the form', async () => {
        renderWithTheme(<LoginForm />)

        const submitButton = screen.getByRole('button', { name: /entrar/i })

        const emailInput = screen.getByPlaceholderText(/digite seu email/i)
        const email = 'teste@mail.com'
        userEvent.type(emailInput, email)

        const passwordInput = screen.getByPlaceholderText(/digite sua senha/i)
        const password = '123456'
        userEvent.type(passwordInput, password)

        await waitFor(() => {
            expect(emailInput).toHaveValue(email)
            expect(passwordInput).toHaveValue(password)
        })

        userEvent.click(submitButton)
        await waitFor(() => {
            expect(submitButton).toHaveFocus()
        })
    })

    it('should show error message when not submiting email and password', async () => {
        renderWithTheme(<LoginForm />)

        const submitButton = screen.getByRole('button', { name: /entrar/i })
        userEvent.click(submitButton)

        await waitFor(() => {
            const emailError = screen.getByText(/email obrigatório/i)
            const passwordError = screen.getByText(/senha obrigatória/i)

            expect(emailError).toBeInTheDocument()
            expect(passwordError).toBeInTheDocument()
        })
    })

    it('should show validation messages when email and password are not correct', async () => {
        renderWithTheme(<LoginForm />)

        const submitButton = screen.getByRole('button', { name: /entrar/i })

        const emailInput = screen.getByPlaceholderText(/digite seu email/i)
        const wrongEmail = 'email.com.br'
        userEvent.type(emailInput, wrongEmail)

        const passwordInput = screen.getByPlaceholderText(/digite sua senha/i)
        const wrongPassword = '1234'
        userEvent.type(passwordInput, wrongPassword)

        userEvent.click(submitButton)
        await waitFor(() => {
            const emailError = screen.getByText(/email inválido/i)
            const passwordError = screen.getByText(/senha precisa conter /i)

            expect(emailError).toBeInTheDocument()
            expect(passwordError).toBeInTheDocument()
        })
    })

    it('should submit form with email and password', async () => {
        const value: AuthContextProps = {
            authenticated: false,
            token: null,
            handleLogin: jest.fn(),
            handleLogout: jest.fn()
        }

        renderWithTheme(
            <AuthContext.Provider value={value}>
                <LoginForm />
            </AuthContext.Provider>
        )

        const submitButton = screen.getByRole('button', { name: /entrar/i })
        const emailInput = screen.getByPlaceholderText(/digite seu email/i)
        const email = 'email@mail.com'
        userEvent.type(emailInput, email)

        const passwordInput = screen.getByPlaceholderText(/digite sua senha/i)
        const password = '123654'
        userEvent.type(passwordInput, password)

        userEvent.click(submitButton)
        await waitFor(() => {
            expect(value.handleLogin).toHaveBeenCalledWith(email, password)
        })
    })
})
