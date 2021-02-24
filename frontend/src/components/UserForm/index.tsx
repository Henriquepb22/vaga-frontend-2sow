import { useState, useRef, useEffect, useCallback } from 'react'
import {
    getAddressNumberErrors,
    getDocumentErrors,
    getCityErrors,
    getDistrictErrors,
    getEmailErrors,
    getNameErrors,
    getStreetErrors,
    getZipcodeErrors
} from 'logic/validations'
import { getUser, insertUser, updateUser } from 'logic/requests/users'
import { getAddressByZipCode } from 'logic/requests/zipcode'
import { Save } from '@styled-icons/material-outlined/Save'
import { documentMask, zipCodeMask } from 'logic/masks'
import { PageTitle } from 'components/PageTitle/styles'
import { REGEX, ROUTES } from 'logic/constants'
import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router'
import { UserProps } from 'types/users'
import { toast } from 'react-toastify'
import { signal } from 'logic/api'
import Button from 'components/Button'
import Input from 'components/Input'

import * as S from './styles'

type UserFormProps = {
    userId?: string
}

const UserForm = ({ userId }: UserFormProps) => {
    const {
        register,
        handleSubmit,
        errors,
        setValue,
        reset,
        trigger
    } = useForm<UserProps>()
    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const numberRef = useRef<HTMLInputElement | null>(null)
    const zipCodeRef = useRef<HTMLInputElement | null>(null)

    const fetchUser = useCallback(async () => {
        if (userId) {
            setLoading(true)
            try {
                const user = await getUser(+userId)
                reset({
                    ...user
                })
            } catch (error) {
                toast.error(error.response?.data.message || Error)
                setRedirect(true)
            }
            setLoading(false)
        } else {
            reset({})
        }
    }, [userId, reset])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    useEffect(() => {
        return () => signal.cancel('component unmounted')
    }, [])

    const onSubmit = handleSubmit(async (values) => {
        setLoading(true)
        try {
            if (userId) {
                await updateUser(+userId, values)
                toast.success('Usuário atualizado com sucesso!')
            } else {
                await insertUser(values)
                toast.success('Usuário adicionado com sucesso!')
            }
            setRedirect(true)
        } catch (error) {
            setLoading(false)
            toast.error(error.response?.data.message || error)
        }
    })

    const getAddressInfo = async (zipCode: string) => {
        setLoading(true)
        try {
            const {
                bairro,
                logradouro,
                localidade,
                erro
            } = await getAddressByZipCode(zipCode)
            setLoading(false)
            if (erro) {
                if (zipCodeRef.current) zipCodeRef.current.focus()
                toast.error('CEP não encontrado.')
            } else {
                if (bairro) {
                    setValue('endereco.bairro', bairro)
                    trigger('endereco.bairro')
                }
                if (localidade) {
                    setValue('endereco.cidade', localidade)
                    trigger('endereco.cidade')
                }
                if (logradouro) {
                    setValue('endereco.rua', logradouro)
                    trigger('endereco.rua')
                }
                if (numberRef.current) numberRef.current.focus()
            }
        } catch (error) {
            toast.error(error.response?.data.message || error)
            setLoading(false)
        }
    }

    return (
        <S.FormBox onSubmit={onSubmit} aria-label="form">
            <PageTitle>{userId ? 'Editar usuário' : 'Novo usuário'}</PageTitle>
            <S.Row>
                <Input
                    id="nome"
                    name="nome"
                    labelFor="nome"
                    disabled={loading}
                    error={getNameErrors(errors.nome?.type)}
                    ref={register({ required: true, minLength: 4 })}
                    placeholder="Ex.: Fabiano Gomes"
                    label="Nome:"
                />
                <Input
                    id="cpf"
                    name="cpf"
                    labelFor="cpf"
                    disabled={loading}
                    error={getDocumentErrors(errors.cpf?.type)}
                    maxLength={14}
                    onChange={(e) =>
                        setValue('cpf', documentMask(e.currentTarget.value))
                    }
                    ref={register({ required: true, pattern: REGEX.DOCUMENT })}
                    placeholder="Ex.: 000.000.000-00"
                    label="CPF:"
                />
            </S.Row>
            <S.Row>
                <Input
                    id="email"
                    name="email"
                    labelFor="email"
                    type="email"
                    disabled={loading}
                    error={getEmailErrors(errors.email?.type)}
                    ref={register({
                        required: true,
                        validate: (email: string) => !!email.match(REGEX.EMAIL)
                    })}
                    placeholder="Ex.: seuemail@exemplo.com"
                    label="E-mail:"
                />
                <Input
                    id="endereco.cep"
                    name="endereco.cep"
                    labelFor="endereco.cep"
                    disabled={loading}
                    error={getZipcodeErrors(errors.endereco?.cep?.type)}
                    ref={(ref) => {
                        register(ref, {
                            required: true,
                            pattern: REGEX.ZIPCODE
                        })
                        zipCodeRef.current = ref
                    }}
                    maxLength={9}
                    onChange={(e) => {
                        setValue(
                            'endereco.cep',
                            zipCodeMask(e.currentTarget.value)
                        )

                        if (e.currentTarget.value.length === 9) {
                            getAddressInfo(e.currentTarget.value)
                        }
                    }}
                    placeholder="Ex.: 00000-000"
                    label="CEP:"
                />
            </S.Row>
            <S.Row>
                <Input
                    id="endereco.rua"
                    name="endereco.rua"
                    labelFor="endereco.rua"
                    disabled={loading}
                    error={getStreetErrors(errors.endereco?.rua?.type)}
                    ref={register({ required: true })}
                    placeholder="Ex.: Rua Lauro Souza"
                    label="Rua:"
                />
                <Input
                    id="endereco.numero"
                    name="endereco.numero"
                    labelFor="endereco.numero"
                    disabled={loading}
                    error={getAddressNumberErrors(
                        errors.endereco?.numero?.type
                    )}
                    ref={(ref) => {
                        register(ref, { required: true })
                        numberRef.current = ref
                    }}
                    placeholder="Ex.: 123A"
                    label="Número:"
                />
            </S.Row>
            <S.Row>
                <Input
                    id="endereco.bairro"
                    name="endereco.bairro"
                    labelFor="endereco.bairro"
                    disabled={loading}
                    error={getDistrictErrors(errors.endereco?.bairro?.type)}
                    ref={register({ required: true })}
                    placeholder="Ex.: Centro"
                    label="Bairro:"
                />
                <Input
                    id="endereco.cidade"
                    name="endereco.cidade"
                    labelFor="endereco.cidade"
                    disabled={loading}
                    error={getCityErrors(errors.endereco?.cidade?.type)}
                    ref={register({ required: true })}
                    placeholder="Ex.: Minas Gerais"
                    label="Cidade:"
                />
            </S.Row>
            <S.ButtonContainer>
                <Button color="primary" isLoading={loading} icon={<Save />}>
                    {userId ? 'Salvar' : 'Adicionar'}
                </Button>
            </S.ButtonContainer>
            {!!redirect && <Redirect to={ROUTES.USERS} />}
        </S.FormBox>
    )
}
export default UserForm
