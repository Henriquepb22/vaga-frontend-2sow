import { useCallback, useEffect, useMemo, useState } from 'react'
import { RemoveCircleOutline } from '@styled-icons/material-outlined/RemoveCircleOutline'
import { Search } from '@styled-icons/material-outlined/Search'
import { Edit } from '@styled-icons/material-outlined/Edit'
import { PageTitle } from 'components/PageTitle/styles'
import { UserFilters, UserReturn } from 'types/users'
import { getUsers } from 'logic/requests/users'
import { toast } from 'react-toastify'
import Button from 'components/Button'
import Table from 'components/Table'
import Input from 'components/Input'

import * as S from './styles'

const baseFilters: UserFilters = {
    page: 1,
    order: 'asc',
    sortBy: 'name'
}

const Users = () => {
    const [users, setUsers] = useState<UserReturn[]>([])
    const [filters, setFilters] = useState<UserFilters>(baseFilters)
    const [loading, setLoading] = useState(false)
    const [totalUsers, setTotalUsers] = useState(0)

    const fetch = useCallback(async () => {
        setLoading(true)
        try {
            const { data, total } = await getUsers(filters)
            if (filters.page === 1) {
                setUsers(data)
            } else {
                setUsers((oldUsers) => [...oldUsers, ...data])
            }
            setTotalUsers(total)
        } catch (error) {
            toast.error(error.response?.data.message || error)
        }
        setLoading(false)
    }, [filters])

    useEffect(() => {
        fetch()
    }, [fetch])

    const loadMore = () =>
        setFilters((oldFilters) => {
            return {
                ...oldFilters,
                page: oldFilters.page + 1
            }
        })

    const columns = [
        {
            title: 'Nome'
        },
        {
            title: 'CPF'
        },
        {
            title: 'Email'
        },
        {
            title: 'Cidade'
        },
        {
            title: 'Ações'
        }
    ]

    const tableBody = useMemo(() => {
        const body = users.map(
            ({ id, name, document, email, address: { city } }) => {
                const row = {
                    id,
                    content: [
                        name,
                        document,
                        email,
                        city,
                        <S.TableButtons key={id}>
                            <S.EditButton
                                type="button"
                                title="Editar"
                                aria-label="Editar"
                                icon={<Edit />}
                            />
                            <S.RemoveButton
                                type="button"
                                color="secondary"
                                title="Remover"
                                aria-label="Editar"
                                icon={<RemoveCircleOutline />}
                            />
                        </S.TableButtons>
                    ]
                }
                return row
            }
        )
        return body
    }, [users])

    const handleFilter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setFilters({
                ...baseFilters,
                name: e.currentTarget.value
            })
        }
    }

    return (
        <S.Container>
            <PageTitle>Usuários</PageTitle>
            <S.FiltersContainer>
                <Input
                    icon={<Search />}
                    label="Buscar"
                    labelFor="search"
                    id="search"
                    placeholder="Digite o nome do usuário"
                    onKeyDown={handleFilter}
                    isLoading={loading}
                />
            </S.FiltersContainer>
            <Table columns={columns} body={tableBody} />
            {totalUsers !== users.length && (
                <S.ButtonContainer>
                    <Button
                        onClick={loadMore}
                        isLoading={loading}
                        color="secondary"
                    >
                        Carregar mais
                    </Button>
                </S.ButtonContainer>
            )}
        </S.Container>
    )
}

export default Users
