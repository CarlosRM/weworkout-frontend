import React, { useState } from 'react'

import style from './LoginComponent.css'

import { CircularProgress, IconButton, InputAdornment, TextField } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../reducers/AuthReducer'
import { selectAuth } from '../../../../constants'
import { VanillaButton } from '../../../../components/VanillaButton'

const LoginComponent = () => {
  const authState = useSelector(selectAuth)
  /* Form fields */
  const [formData, setFormData] = useState({
    email: {
      value: '',
      dirty: false,
      required: true
    },
    password: {
      value: '',
      required: true,
      dirty: false
    },
    showPassword: false
  })

  /* Grab useDispatch to use it later */
  const dispatch = useDispatch()

  /* Handle input change and update state */
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: {
        value: e.target.value,
        dirty: true
      }
    })
  }

  const handleClickShowPassword = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const submit = (e) => {
    e.preventDefault()
    const data = {
      email: formData.email.value,
      password: formData.password.value
    }
    dispatch(login(data))
  }

  return (
    <div className={style.hero}>
      <div className={style.hero__catch}>
        <h1 className={style.hero__title}>
          Inicia sesión
        </h1>
        <form onSubmit={submit} className={style.loginForm}>
          <TextField
            variant='outlined'
            label='Correo electrónico'
            name='email'
            type='email'
            value={formData.email.value}
            onChange={e => handleInputChange(e)}
          />

          <TextField
            variant='outlined'
            label='Contraseña'
            name='password'
            type={formData.showPassword ? 'text' : 'password'}
            value={formData.password.value}
            onChange={e => handleInputChange(e)}
            InputProps = {{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >{formData.showPassword ? <Visibility /> : <VisibilityOff />}</IconButton>
                </InputAdornment>
              )
            }}
          />

        <VanillaButton variant="contained" color="primary" type='submit' className={style['loginForm__button--primary']}>
           {!authState.loading && 'Iniciar sesión'}
           {authState.loading && <CircularProgress size={24}/>}
        </VanillaButton>
        </form>
      </div>
    </div>
  )
}

export default LoginComponent
