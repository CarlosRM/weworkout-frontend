import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#1ffaf9'
    },
    secondary: {
      main: '#fff'
    },
    error: {
      main: '#fc3d3d'
    },
    action: {
      disabledBackground: 'rgb(63,132,255,0.5)',
      disabled: 'rgba(0,0,0,0.5)'
    }
  },
  typography: {
    button: {
      fontWeight: 'bolder'
    }
  }
})

export default theme
