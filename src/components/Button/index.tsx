import { ButtonHTMLAttributes } from 'react'
import { Button } from './styles'

export function ButtonStyled(props: ButtonHTMLAttributes<any>): JSX.Element {
  return <Button {...props} />
}
