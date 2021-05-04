import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core'
import RateReviewIcon from '@material-ui/icons/RateReview'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import styled from 'styled-components'

const Spacer = styled.div`
  flex-grow: 1;
`

export function TopBar(): JSX.Element {
  return (
    <AppBar>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <RateReviewIcon />
        </IconButton>
        <Button color="inherit">Criar avaliação</Button>
        <Button color="inherit">Minhas avaliações</Button>
        <Button color="inherit">Buscar avaliações</Button>
        <Button color="inherit">Histórico</Button>
        <Spacer />
        <IconButton edge="end" color="inherit">
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
