import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'

import { ROUTES } from 'logic/constants'
import Wrapper from 'components/Wrapper'
import Login from 'pages/Login'

const Routes = () => (
    <Router>
        <Switch>
            <Wrapper>
                <Route path={ROUTES.LOGIN} component={() => <Login />} />
                <Redirect from="*" to={ROUTES.LOGIN} />
            </Wrapper>
        </Switch>
    </Router>
)

export default Routes
