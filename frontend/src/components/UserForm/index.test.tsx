import { screen, waitFor } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import userEvent from '@testing-library/user-event'

import UserForm from '.'

describe('<UserForm />', () => {
    it('should render user form fields and submit button', () => {
        renderWithTheme(<UserForm />)

        expect(screen.getByLabelText(/nome/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/cpf/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/cep/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/rua/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/número/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/bairro/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/cidade/i)).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /adicionar/i })
        ).toBeInTheDocument()
    })

    it('should require and show error messasges on all fields', async () => {
        renderWithTheme(<UserForm />)

        const submitButton = screen.getByRole('button', { name: /adicionar/i })
        userEvent.click(submitButton)

        await waitFor(() => {
            const nameError = screen.getByText(/nome obrigatório/i)
            const documentError = screen.getByText(/cpf obrigatório/i)
            const emailError = screen.getByText(/email obrigatório/i)
            const zipCodeError = screen.getByText(/cep obrigatório/i)
            const streetError = screen.getByText(/rua obrigatória/i)
            const addressNumberError = screen.getByText(/número obrigatório/i)
            const districtError = screen.getByText(/bairro obrigatório/i)
            const cityError = screen.getByText(/cidade obrigatória/i)

            expect(nameError).toBeInTheDocument()
            expect(documentError).toBeInTheDocument()
            expect(emailError).toBeInTheDocument()
            expect(zipCodeError).toBeInTheDocument()
            expect(streetError).toBeInTheDocument()
            expect(addressNumberError).toBeInTheDocument()
            expect(districtError).toBeInTheDocument()
            expect(cityError).toBeInTheDocument()
        })
    })

    it('should apply zipcode mask', async () => {
        renderWithTheme(<UserForm />)

        const zipCodeInput = screen.getByPlaceholderText(/ex.: 00000-000/i)
        const text = '11111111'

        userEvent.type(zipCodeInput, text)

        await waitFor(() => {
            expect(zipCodeInput).toHaveValue('11111-111')
        })
    })

    it('should validate zipcode input', async () => {
        renderWithTheme(<UserForm />)

        const submitButton = screen.getByRole('button', { name: /adicionar/i })
        const zipCodeInput = screen.getByPlaceholderText(/ex.: 00000-000/i)
        const text = '111111'

        userEvent.type(zipCodeInput, text)
        userEvent.click(submitButton)

        await waitFor(() => {
            expect(screen.getByText(/cep inválido/i)).toBeInTheDocument()
        })
    })

    it('should apply document mask', async () => {
        renderWithTheme(<UserForm />)

        const submitButton = screen.getByRole('button', { name: /adicionar/i })
        const documentInput = screen.getByPlaceholderText(
            /ex.: 000.000.000-00/i
        )
        const text = '11111111111'

        userEvent.type(documentInput, text)
        userEvent.click(submitButton)

        await waitFor(() => {
            expect(documentInput).toHaveValue('111.111.111-11')
        })
    })

    it('should validate document input', async () => {
        renderWithTheme(<UserForm />)

        const submitButton = screen.getByRole('button', { name: /adicionar/i })
        const documentInput = screen.getByPlaceholderText(
            /ex.: 000.000.000-00/i
        )
        const text = '111111'

        userEvent.type(documentInput, text)
        userEvent.click(submitButton)

        await waitFor(() => {
            expect(screen.getByText(/cpf inválido/i)).toBeInTheDocument()
        })
    })

    it('should validate name size', async () => {
        renderWithTheme(<UserForm />)

        const submitButton = screen.getByRole('button', { name: /adicionar/i })
        const nameInput = screen.getByPlaceholderText(/ex.: fabiano gomes/i)
        const text = 'abc'

        userEvent.type(nameInput, text)
        userEvent.click(submitButton)

        await waitFor(() => {
            expect(
                screen.getByText(/nome precisa conter mais de 4 caracteres/i)
            ).toBeInTheDocument()
        })
    })
})
