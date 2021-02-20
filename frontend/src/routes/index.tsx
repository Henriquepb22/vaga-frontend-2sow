import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'

import { ROUTES } from 'logic/constants'
import Login from 'pages/Login'

const Routes = () => (
    <Router>
        <Switch>
            <Route path={ROUTES.LOGIN} component={() => <Login />} />
            <Redirect from="*" to={ROUTES.LOGIN} />
        </Switch>
    </Router>
)

export default Routes
