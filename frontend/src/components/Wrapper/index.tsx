import { useContext, useState, useEffect, useCallback } from 'react'
import { AddCircleOutline } from '@styled-icons/material/AddCircleOutline'
import Header, { NavLinkProps } from 'components/Header'
import { Logout } from '@styled-icons/material/Logout'
import { Group } from '@styled-icons/material/Group'
import { AuthContext } from 'contexts/AuthContext'
import { ROUTES } from 'logic/constants'

import * as S from './styles'

type WrapperProps = {
    children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps) => {
    const { authenticated } = useContext(AuthContext)
    const [navLinks, setNavLinks] = useState<NavLinkProps[]>([])

    const getHeaderLinks = useCallback(() => {
        const links = [
            {
                label: 'Novo usuário',
                linkTo: ROUTES.USER,
                icon: <AddCircleOutline />
            },
            {
                label: 'Usuários',
                linkTo: ROUTES.USERS,
                icon: <Group />
            },
            {
                label: 'Sair',
                linkTo: ROUTES.LOGOUT,
                icon: <Logout />
            }
        ]
        setNavLinks(links)
    }, [])

    useEffect(() => {
        if (authenticated) {
            getHeaderLinks()
        } else {
            setNavLinks([])
        }
    }, [authenticated, getHeaderLinks])

    return (
        <S.Wrapper>
            <Header title="Cadastro" links={navLinks} />
            {children}
        </S.Wrapper>
    )
}

export default Wrapper
