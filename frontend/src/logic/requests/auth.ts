import { UserReturn } from 'types/users'
import api from 'logic/api'

export const login = async (
    email: string,
    password: string
): Promise<UserReturn[]> => {
    const { data } = await api.get('/users', {
        params: {
            email,
            password,
            _limit: 1
        }
    })

    return data
}
