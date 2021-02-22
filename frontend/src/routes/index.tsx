import { useContext } from 'react'
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'
import { AuthContext } from 'contexts/AuthContext'
import { ROUTES } from 'logic/constants'
import Login from 'pages/Login'
import Users from 'pages/Users'

const Routes = () => {
    const { authenticated } = useContext(AuthContext)
    const isLoginRoute = useRouteMatch(ROUTES.LOGIN)?.isExact
    const redirectToUsers = authenticated && isLoginRoute

    return (
        <Switch>
            {redirectToUsers && <Redirect to={ROUTES.USERS} />}
            <Route path={ROUTES.LOGIN} exact>
                <Login />
            </Route>
            {!authenticated && <Redirect to={ROUTES.LOGIN} />}
            <Route path={ROUTES.USERS} exact>
                <Users />
            </Route>
            <Redirect from="*" to={ROUTES.USERS} />
        </Switch>
    )
}

export default Routes
