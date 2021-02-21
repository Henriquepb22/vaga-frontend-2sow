import { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthContext } from 'contexts/AuthContext'
import { ROUTES } from 'logic/constants'
import Login from 'pages/Login'

const Routes = () => {
    const { authenticated } = useContext(AuthContext)

    return (
        <Switch>
            <Route path={ROUTES.LOGIN} exact>
                <Login />
            </Route>
            {!authenticated && <Redirect to={ROUTES.LOGIN} />}
            <Redirect from="*" to={ROUTES.LOGIN} />
        </Switch>
    )
}

export default Routes
