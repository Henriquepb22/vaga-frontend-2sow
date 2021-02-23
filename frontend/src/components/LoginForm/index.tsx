import { useContext, useState } from 'react'
import { getEmailErrors, getPasswordErrors } from 'logic/validations'
import { Email } from '@styled-icons/material/Email'
import { Lock } from '@styled-icons/material/Lock'
import { AuthContext } from 'contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { REGEX } from 'logic/constants'
import { toast } from 'react-toastify'
import Button from 'components/Button'
import Input from 'components/Input'

import * as S from './styles'

type FormProps = {
    email: string
    password: string
}

const LoginForm = () => {
    const { handleLogin } = useContext(AuthContext)
    const { register, errors, handleSubmit } = useForm<FormProps>()
    const [loading, setLoading] = useState(false)

    const onSubmit = handleSubmit(async ({ email, password }) => {
        setLoading(true)
        try {
            await handleLogin(email, password)
        } catch (error) {
            setLoading(false)
            toast.error(error)
        }
    })

    return (
        <S.LoginBox>
            <S.LoginText>Bem vindo de volta</S.LoginText>
            <S.LoginInfo>
                Digite seus dados abaixo para acessar o site.
            </S.LoginInfo>
            <S.FormContainer onSubmit={onSubmit} role="form">
                <Input
                    name="email"
                    error={getEmailErrors(errors.email?.type)}
                    autoComplete="email"
                    placeholder="Digite seu email"
                    inputSize="large"
                    icon={<Email />}
                    ref={register({
                        required: true,
                        validate: (email: string) => !!email.match(REGEX.EMAIL)
                    })}
                    disabled={loading}
                />
                <Input
                    name="password"
                    type="password"
                    error={getPasswordErrors(errors.password?.type)}
                    autoComplete="current-password"
                    placeholder="Digite sua senha"
                    inputSize="large"
                    icon={<Lock />}
                    ref={register({ required: true, minLength: 5 })}
                    disabled={loading}
                />
                <Button size="large" isLoading={loading} color="secondary">
                    Entrar
                </Button>
            </S.FormContainer>
        </S.LoginBox>
    )
}
export default LoginForm
