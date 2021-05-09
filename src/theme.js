import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#03a9f4'
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
  },
  overrides: {
    MuiTextField: {
      root: {
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        '& label.Mui-focused': {
          color: '#212121'
        },
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: '#212121'
          }
        }
      }
    },
    MuiAvatar: {
      colorDefault: {
        backgroundColor: '#03a9f4'
      }
    },
    MuiFormGroup: {
      root: {
        flexDirection: 'row'
      }
    },
    MuiRadio: {
      colorSecondary: {
        '&$checked': {
          color: 'var(--primaryColor)'
        }
      }
    },
    MuiRating: {
      root: {
        color: 'var(--primaryColor)',
        '& .MuiRating-label': {
          fontSize: '3rem'
        }
      }
    }
  }
})

export default theme
