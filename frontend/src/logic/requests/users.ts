import { UserProps, UserFilters, UsersReturn } from 'types/users'
import { REQUESTS } from 'logic/constants'
import api from 'logic/api'

export const insertUser = async (user: UserProps) => {
    const { data } = await api.post('/users', {
        ...user
    })

    return data
}

export const getUsers = async (filters: UserFilters): Promise<UsersReturn> => {
    const { page, name, order, sortBy } = filters
    const { data, headers } = await api.get('/users', {
        params: {
            _page: page,
            _limit: REQUESTS.PAGE_LIMIT,
            _sort: sortBy,
            _order: order,
            name_like: name
        }
    })

    return {
        data,
        total: Number(headers['x-total-count'])
    }
}

export const getUser = async (id: number): Promise<UserProps> => {
    const { data } = await api.get(`/users/${id}`)

    return data
}

export const updateUser = async (id: number, user: UserProps) => {
    const { data } = await api.put(`/users/${id}`, {
        ...user
    })

    return data
}

export const deleteUser = async (id: number) => {
    const { data } = await api.delete(`/users/${id}`)

    return data
}
