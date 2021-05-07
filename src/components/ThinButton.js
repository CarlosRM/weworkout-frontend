import { Button, withStyles } from '@material-ui/core'

export const ThinButton = withStyles((theme) => ({
  root: {
    color: 'var(--textIconsColor)',
    background: 'linear-gradient(45deg, var(--darkPrimaryColor) 30%, var(--primaryColor) 90%)',
    '&:hover': {
      background: 'linear-gradient(45deg, var(--primaryColor) 30%, var(--darkPrimaryColor) 90%)'
    }
  }
}))(Button)
