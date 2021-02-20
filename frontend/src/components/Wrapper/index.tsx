import Header from 'components/Header'
import * as S from './styles'

type WrapperProps = {
    children: React.ReactNode
}

const Wrapper = ({ children }: WrapperProps) => {
    return (
        <S.Wrapper>
            <Header title="Cadastro" />
            {children}
        </S.Wrapper>
    )
}

export default Wrapper
