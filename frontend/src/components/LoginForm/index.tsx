import { Email } from '@styled-icons/material/Email'
import { Lock } from '@styled-icons/material/Lock'
import Button from 'components/Button'
import Input from 'components/Input'

import * as S from './styles'

type LoginFormProps = {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
    return (
        <S.Wrapper>
            <S.LoginBox>
                <S.LoginText>Bem vindo de volta</S.LoginText>
                <S.LoginInfo>
                    Digite seus dados abaixo para acessar o site.
                </S.LoginInfo>
                <S.FormContainer onSubmit={onSubmit}>
                    <Input
                        labelFor="email"
                        id="email"
                        placeholder="Digite seu email"
                        type="email"
                        autoComplete="email"
                        icon={<Email />}
                        required
                    />
                    <Input
                        labelFor="password"
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Digite sua senha"
                        minLength={5}
                        icon={<Lock />}
                        required
                    />
                    <Button size="large">Entrar</Button>
                </S.FormContainer>
            </S.LoginBox>
        </S.Wrapper>
    )
}
export default LoginForm
