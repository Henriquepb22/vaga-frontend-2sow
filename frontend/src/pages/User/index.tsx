import UserForm from 'components/UserForm'
import { useParams } from 'react-router'

type RouteParams = {
    id?: string
}

const User = () => {
    const { id } = useParams<RouteParams>()

    return <UserForm userId={id} />
}

export default User
