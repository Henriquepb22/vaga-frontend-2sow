import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import AuthProvider from 'contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import Wrapper from 'components/Wrapper'
import Routes from 'routes'

import 'react-toastify/dist/ReactToastify.css'
import { GlobalStyles } from 'styles/global'
import theme from 'styles/theme'

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Router>
                    <Wrapper>
                        <GlobalStyles />
                        <Routes />
                    </Wrapper>
                </Router>
            </AuthProvider>
            <ToastContainer position="bottom-right" autoClose={2000} />
        </ThemeProvider>
    )
}

export default App
