export type UserProps = {
    name: string
    document: string
    email: string
    address: {
        zipcode: number
        street: string
        number: string
        district: string
        city: string
    }
}

export type UserReturn = UserProps & {
    id: number
}

export type UsersReturn = {
    data: UserReturn[]
    total: number
}

export type UserFilters = {
    page: number
    name?: string
    sortBy: string
    order: 'asc' | 'desc'
}
