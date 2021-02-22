import { forwardRef, InputHTMLAttributes } from 'react'

import * as S from './styles'

export type InputProps = {
    label?: string
    labelFor?: string
    icon?: JSX.Element
    error?: string
    inputSize?: 'normal' | 'large'
    isLoading?: boolean
} & InputHTMLAttributes<HTMLInputElement>

const InputComponent = forwardRef<HTMLInputElement, InputProps>(function Input(
    {
        label,
        labelFor = '',
        icon,
        error,
        inputSize = 'normal',
        isLoading = false,
        ...props
    },
    ref
) {
    return (
        <S.Wrapper error={!!error} isLoading={isLoading}>
            {!!label && <S.Label htmlFor={labelFor}>{label}</S.Label>}
            <S.InputWrapper>
                {!!icon && <S.Icon>{icon}</S.Icon>}
                <S.Input
                    inputSize={inputSize}
                    ref={ref}
                    disabled={isLoading}
                    {...props}
                />
            </S.InputWrapper>
            {!!error && <S.Error>{error}</S.Error>}
        </S.Wrapper>
    )
})

export default InputComponent
