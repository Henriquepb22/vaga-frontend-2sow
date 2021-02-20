import { InputHTMLAttributes, useState } from 'react'

import * as S from './styles'

type InputProps = {
    onInput?: (value: string) => void
    label?: string
    labelFor?: string
    initialValue?: string
    icon?: JSX.Element
    error?: string
} & InputHTMLAttributes<HTMLInputElement>

const Input = ({
    onInput,
    label,
    labelFor = '',
    initialValue = '',
    icon,
    error,
    ...props
}: InputProps) => {
    const [value, setValue] = useState(initialValue)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value
        setValue(newValue)
        if (onInput) {
            onInput(newValue)
        }
    }

    return (
        <S.Wrapper error={!!error}>
            {!!label && <S.Label htmlFor={labelFor}>{label}</S.Label>}
            <S.InputWrapper>
                {!!icon && <S.Icon>{icon}</S.Icon>}
                <S.Input onChange={onChange} value={value} {...props} />
            </S.InputWrapper>
            {!!error && <S.Error>{error}</S.Error>}
        </S.Wrapper>
    )
}

export default Input
