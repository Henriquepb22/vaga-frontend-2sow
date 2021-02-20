import { ButtonHTMLAttributes } from 'react'
import * as S from './styles'

export type ButtonProps = {
    icon?: JSX.Element
    color?: 'primary' | 'secondary'
    size?: 'normal' | 'large'
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
    children,
    icon,
    color = 'primary',
    size = 'normal',
    ...props
}: ButtonProps) => (
    <S.Wrapper color={color} size={size} {...props}>
        {icon}
        {!!children && <span>{children}</span>}
    </S.Wrapper>
)

export default Button
