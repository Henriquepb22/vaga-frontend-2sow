import LoginForm from 'components/LoginForm'

import * as S from './styles'

const Login = () => {
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <S.Container>
            <LoginForm onSubmit={onSubmit} />
        </S.Container>
    )
}

export default Login
