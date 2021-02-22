import { screen, render } from '@testing-library/react'

import Logout from '.'

describe('<Logout />', () => {
    it('should render logout page', () => {
        render(<Logout />)

        expect(
            screen.getByText(/você está sendo redirecionado/i)
        ).toBeInTheDocument()
    })
})
