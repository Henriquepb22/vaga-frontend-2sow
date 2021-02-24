export type UserProps = {
    nome: string
    cpf: string
    email: string
    endereco: {
        cep: number
        rua: string
        numero: string
        bairro: string
        cidade: string
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
    nome?: string
    sortBy: string
    order: 'asc' | 'desc'
}
