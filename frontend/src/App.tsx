import Routes from 'routes'
import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from 'styles/global'
import theme from 'styles/theme'

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Routes />
        </ThemeProvider>
    )
}

export default App
