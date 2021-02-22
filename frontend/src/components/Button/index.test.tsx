import { Login } from '@styled-icons/material-outlined/Login'
import { renderWithTheme } from 'utils/tests/helpers'
import { screen } from '@testing-library/react'

import Button from '.'

describe('<Button />', () => {
    it('should render button with default styles', () => {
        renderWithTheme(<Button>Login</Button>)

        expect(screen.getByRole('button', { name: /login/i })).toHaveStyle({
            height: '3.2rem',
            fontSize: '1.6rem',
            backgroundColor: '#267FFF'
        })
    })

    it('should render button on large size', () => {
        renderWithTheme(<Button size="large">Login</Button>)

        expect(screen.getByRole('button', { name: /login/i })).toHaveStyle({
            height: '4.6rem',
            fontSize: '2rem'
        })
    })

    it('should render button with secondary color', () => {
        renderWithTheme(<Button color="secondary">Login</Button>)

        expect(screen.getByRole('button', { name: /login/i })).toHaveStyle({
            backgroundColor: '#31507D'
        })
    })

    it('should render button with icon', () => {
        renderWithTheme(
            <Button icon={<Login data-testid="icon" />}>Login</Button>
        )

        expect(
            screen.getByRole('button', { name: /login/i })
        ).toBeInTheDocument()
        expect(screen.getByTestId(/icon/i)).toBeInTheDocument()
    })

    it('should disable button on loading', () => {
        renderWithTheme(<Button isLoading={true}>Login</Button>)

        expect(screen.getByRole('button', { name: /login/i })).toHaveAttribute(
            'disabled'
        )
    })
})
