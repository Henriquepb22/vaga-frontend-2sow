import { FieldError } from 'react-hook-form'

export const getEmailErrors = (type?: FieldError['type']) => {
    if (type === 'required') {
        return 'Email obrigatório'
    }
    if (type === 'validate') {
        return 'Email inválido'
    }
    return ''
}

export const getPasswordErrors = (type?: FieldError['type']) => {
    if (type === 'required') {
        return 'Senha obrigatória'
    }
    if (type === 'minLength') {
        return 'Senha precisa conter mais de 4 caracteres'
    }
    return ''
}

export const getNameErrors = (type?: FieldError['type']) => {
    if (type === 'required') {
        return 'Nome obrigatório'
    }
    if (type === 'minLength') {
        return 'Nome precisa conter mais de 4 caracteres'
    }
    return ''
}

export const getDocumentErrors = (type?: FieldError['type']) => {
    if (type === 'required') {
        return 'CPF obrigatório'
    }
    return ''
}

export const getZipcodeErrors = (type?: FieldError['type']) => {
    if (type === 'required') {
        return 'CEP obrigatório'
    }
    if (type === 'pattern') {
        return 'CEP inválido'
    }
    return ''
}

export const getStreetErrors = (type?: FieldError['type']) => {
    if (type === 'required') {
        return 'Rua obrigatória'
    }
    return ''
}

export const getAddressNumberErrors = (type?: FieldError['type']) => {
    if (type === 'required') {
        return 'Número obrigatório'
    }
    return ''
}

export const getDistrictErrors = (type?: FieldError['type']) => {
    if (type === 'required') {
        return 'Bairro obrigatório'
    }
    return ''
}

export const getCityErrors = (type?: FieldError['type']) => {
    if (type === 'required') {
        return 'Cidade obrigatória'
    }
    return ''
}
