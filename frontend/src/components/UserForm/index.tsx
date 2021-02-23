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
import { getAddressByZipCode } from 'logic/requests/zipcode'
import { Save } from '@styled-icons/material-outlined/Save'
import { getUser, insertUser, updateUser } from 'logic/requests/users'
import { documentMask, zipCodeMask } from 'logic/masks'
import { PageTitle } from 'components/PageTitle/styles'
import { REGEX, ROUTES } from 'logic/constants'
import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router'
import { UserProps } from 'types/users'
import { toast } from 'react-toastify'
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
                    setValue('address.district', bairro)
                    trigger('address.district')
                }
                if (localidade) {
                    setValue('address.city', localidade)
                    trigger('address.city')
                }
                if (logradouro) {
                    setValue('address.street', logradouro)
                    trigger('address.street')
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
                    id="name"
                    name="name"
                    labelFor="name"
                    disabled={loading}
                    error={getNameErrors(errors.name?.type)}
                    ref={register({ required: true, minLength: 4 })}
                    placeholder="Ex.: Fabiano Gomes"
                    label="Nome:"
                />
                <Input
                    id="document"
                    name="document"
                    labelFor="document"
                    disabled={loading}
                    error={getDocumentErrors(errors.document?.type)}
                    maxLength={14}
                    onChange={(e) =>
                        setValue(
                            'document',
                            documentMask(e.currentTarget.value)
                        )
                    }
                    ref={register({ required: true })}
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
                    id="address.zipcode"
                    name="address.zipcode"
                    labelFor="address.zipcode"
                    disabled={loading}
                    error={getZipcodeErrors(errors.address?.zipcode?.type)}
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
                            'address.zipcode',
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
                    id="address.street"
                    name="address.street"
                    labelFor="address.street"
                    disabled={loading}
                    error={getStreetErrors(errors.address?.street?.type)}
                    ref={register({ required: true })}
                    placeholder="Ex.: Rua Lauro Souza"
                    label="Rua:"
                />
                <Input
                    id="address.number"
                    name="address.number"
                    labelFor="address.number"
                    disabled={loading}
                    error={getAddressNumberErrors(errors.address?.number?.type)}
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
                    id="address.district"
                    name="address.district"
                    labelFor="address.district"
                    disabled={loading}
                    error={getDistrictErrors(errors.address?.district?.type)}
                    ref={register({ required: true })}
                    placeholder="Ex.: Centro"
                    label="Bairro:"
                />
                <Input
                    id="address.city"
                    name="address.city"
                    labelFor="address.city"
                    disabled={loading}
                    error={getCityErrors(errors.address?.city?.type)}
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
