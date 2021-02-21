import { forwardRef, InputHTMLAttributes } from 'react'

import * as S from './styles'

type InputProps = {
    label?: string
    labelFor?: string
    icon?: JSX.Element
    error?: string
} & InputHTMLAttributes<HTMLInputElement>

const InputComponent = forwardRef<HTMLInputElement, InputProps>(function Input(
    { label, labelFor = '', icon, error, ...props },
    ref
) {
    return (
        <S.Wrapper error={!!error}>
            {!!label && <S.Label htmlFor={labelFor}>{label}</S.Label>}
            <S.InputWrapper>
                {!!icon && <S.Icon>{icon}</S.Icon>}
                <S.Input ref={ref} {...props} />
            </S.InputWrapper>
            {!!error && <S.Error>{error}</S.Error>}
        </S.Wrapper>
    )
})

export default InputComponent
