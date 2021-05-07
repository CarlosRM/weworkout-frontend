import { Button, withStyles } from '@material-ui/core'

export const ThinButtonRed = withStyles((theme) => ({
  root: {
    color: 'var(--textIconsColor)',
    background: 'linear-gradient(45deg, var(--errorColor) 30%, red 90%)',
    '&:hover': {
      background: 'linear-gradient(45deg, red 30%, var(--errorColor) 90%)'
    }
  }
}))(Button)
