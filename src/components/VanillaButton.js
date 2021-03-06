import { Button, withStyles } from '@material-ui/core'

export const VanillaButton = withStyles((theme) => ({
  root: {
    color: 'var(--textIconsColor)',
    background: 'linear-gradient(45deg, var(--darkPrimaryColor) 30%, var(--primaryColor) 90%)',
    padding: '1rem 2rem',
    '&:hover': {
      background: 'linear-gradient(45deg, var(--primaryColor) 30%, var(--darkPrimaryColor) 90%)'
    }
  }
}))(Button)
