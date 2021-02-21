import { ButtonHTMLAttributes } from 'react'
import * as S from './styles'

export type ButtonProps = {
    icon?: JSX.Element
    color?: 'primary' | 'secondary'
    size?: 'normal' | 'large'
    isLoading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
    children,
    icon,
    color = 'primary',
    size = 'normal',
    isLoading = false,
    ...props
}: ButtonProps) => (
    <S.Wrapper
        color={color}
        size={size}
        isLoading={isLoading}
        disabled={isLoading}
        {...props}
    >
        {icon}
        {!!children && <span>{children}</span>}
    </S.Wrapper>
)

export default Button
