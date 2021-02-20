import * as S from './styles'

export type HeaderProps = {
    title: string
    links?: {
        linkTo: string
        label: string
        icon?: JSX.Element
    }[]
}

const Header = ({ title, links }: HeaderProps) => {
    return (
        <S.Header>
            <S.Title>{title}</S.Title>
            {!!links && (
                <S.Nav>
                    {links.map(({ linkTo, label, icon }) => (
                        <S.NavLink key={linkTo} to={linkTo}>
                            {label}
                            {icon}
                        </S.NavLink>
                    ))}
                </S.Nav>
            )}
        </S.Header>
    )
}

export default Header
