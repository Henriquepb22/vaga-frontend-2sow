import { UserReturn } from 'types/users'
import api from 'logic/api'

export const login = async (email: string): Promise<UserReturn[]> => {
    const { data } = await api.get('/users', {
        params: {
            email,
            _limit: 1
        }
    })

    return data
}
