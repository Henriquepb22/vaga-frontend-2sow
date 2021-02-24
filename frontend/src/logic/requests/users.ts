import { UserProps, UserFilters, UsersReturn } from 'types/users'
import { REQUESTS } from 'logic/constants'
import api from 'logic/api'

export const insertUser = async (user: UserProps) => {
    const { data } = await api.post('/usuarios', {
        ...user
    })

    return data
}

export const getUsers = async (filters: UserFilters): Promise<UsersReturn> => {
    const { page, nome, order, sortBy } = filters
    const { data, headers } = await api.get('/usuarios', {
        params: {
            _page: page,
            _limit: REQUESTS.PAGE_LIMIT,
            _sort: sortBy,
            _order: order,
            nome_like: nome
        }
    })

    return {
        data,
        total: Number(headers['x-total-count'])
    }
}

export const getUser = async (id: number): Promise<UserProps> => {
    const { data } = await api.get(`/usuarios/${id}`)

    return data
}

export const updateUser = async (id: number, user: UserProps) => {
    const { data } = await api.put(`/usuarios/${id}`, {
        ...user
    })

    return data
}

export const deleteUser = async (id: number) => {
    const { data } = await api.delete(`/usuarios/${id}`)

    return data
}
