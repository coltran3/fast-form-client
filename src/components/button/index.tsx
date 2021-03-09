import { Button } from './styles'
interface Iprops {
  href?: string
  children?: any
}

export default function ButtonStyled(props: Iprops): JSX.Element {
  return (
    <a href={props.href} target="blank">
      <Button>{props.children}</Button>
    </a>
  )
}
