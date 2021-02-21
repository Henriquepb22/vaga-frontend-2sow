import { screen, waitFor } from '@testing-library/react'
import { Email } from '@styled-icons/material/Email'
import userEvent from '@testing-library/user-event'

import { renderWithTheme } from 'utils/tests/helpers'

import Input from '.'

describe('<Input />', () => {
    it('should render input with label', () => {
        renderWithTheme(<Input label="Label" labelFor="Label" id="Label" />)

        expect(screen.getByLabelText(/label/i)).toBeInTheDocument()
    })

    it('should render input without label', () => {
        renderWithTheme(<Input />)

        expect(screen.queryByLabelText(/label/i)).not.toBeInTheDocument()
    })

    it('should change its value when typing', async () => {
        renderWithTheme(<Input label="Label" labelFor="Label" id="Label" />)

        const input = screen.getByRole('textbox')
        const text = 'new text'
        userEvent.type(input, text)

        await waitFor(() => {
            expect(input).toHaveValue(text)
        })
    })

    it('should render with an icon', () => {
        renderWithTheme(<Input icon={<Email data-testid="icon" />} />)

        expect(screen.getByTestId(/icon/i)).toBeInTheDocument()
    })

    it('should be acessible with tab', () => {
        renderWithTheme(<Input label="Label" labelFor="Label" id="Label" />)

        const input = screen.getByLabelText(/label/i)
        expect(document.body).toHaveFocus()

        userEvent.tab()
        expect(input).toHaveFocus()
    })

    it('should render with error', () => {
        renderWithTheme(
            <Input
                label="Label"
                labelFor="Label"
                id="Label"
                error="Ops... something bad happened"
            />
        )

        expect(
            screen.getByText(/ops... something bad happened/i)
        ).toBeInTheDocument()
    })
})
