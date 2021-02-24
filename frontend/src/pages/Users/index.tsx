import { useCallback, useEffect, useMemo, useState } from 'react'
import { RemoveCircleOutline } from '@styled-icons/material-outlined/RemoveCircleOutline'
import { ExpandMore } from '@styled-icons/material-outlined/ExpandMore'
import { Search } from '@styled-icons/material-outlined/Search'
import { deleteUser, getUsers } from 'logic/requests/users'
import { Edit } from '@styled-icons/material-outlined/Edit'
import { PageTitle } from 'components/PageTitle/styles'
import { UserFilters, UserReturn } from 'types/users'
import { ROUTES } from 'logic/constants'
import { Link } from 'react-router-dom'
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
    const noUsers = !users.length && !loading

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

    const handleDelete = useCallback(
        async (id: number) => {
            setLoading(true)
            try {
                await deleteUser(id)
                toast.info('Usuário removido com sucesso.')
                fetch()
            } catch (error) {
                toast.error(error.response?.data.message || error)
                setLoading(false)
            }
        },
        [fetch]
    )

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
            ({ id, nome, cpf, email, endereco: { cidade } }) => {
                const row = {
                    id,
                    content: [
                        nome,
                        cpf,
                        email,
                        cidade,
                        <S.TableButtons key={id}>
                            <Link to={ROUTES.EDIT_USER.replace(':id', `${id}`)}>
                                <S.EditButton
                                    type="button"
                                    title="Editar"
                                    aria-label="Editar"
                                    icon={<Edit />}
                                />
                            </Link>
                            <S.RemoveButton
                                onClick={() => handleDelete(id)}
                                type="button"
                                color="secondary"
                                title="Remover"
                                aria-label="Remover"
                                icon={<RemoveCircleOutline />}
                            />
                        </S.TableButtons>
                    ]
                }
                return row
            }
        )
        return body
    }, [users, handleDelete])

    const handleFilter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setFilters({
                ...baseFilters,
                nome: e.currentTarget.value
            })
        }
    }

    return (
        <S.Container>
            <PageTitle>Usuários</PageTitle>
            <S.FiltersContainer>
                <Input
                    icon={<Search />}
                    id="search"
                    placeholder="Digite o nome do usuário"
                    onKeyDown={handleFilter}
                    isLoading={loading}
                    inputSize="large"
                />
            </S.FiltersContainer>
            {!!users.length && <Table columns={columns} body={tableBody} />}
            {noUsers && (
                <S.NoUsersMessage>
                    Nenhum usuário encontrado :(
                </S.NoUsersMessage>
            )}
            {totalUsers !== users.length && (
                <Button
                    onClick={loadMore}
                    isLoading={loading}
                    color="secondary"
                    icon={<ExpandMore />}
                >
                    Carregar mais
                </Button>
            )}
        </S.Container>
    )
}

export default Users
