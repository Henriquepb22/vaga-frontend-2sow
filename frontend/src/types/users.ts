export type UserProps = {
    name: string
    document: string
    email: string
    address: {
        zipcode: number
        street: string
        number: number
        district: string
        city: string
    }
}

export type UserFilters = {
    page: number
    name?: string
    sortBy: string
    order: 'asc' | 'desc'
}
