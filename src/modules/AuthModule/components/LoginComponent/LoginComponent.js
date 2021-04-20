import React, { useEffect, useState } from 'react'

import style from './LoginComponent.css'

import { CircularProgress, IconButton, InputAdornment, TextField, Tooltip } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../reducers/AuthReducer'
import { selectAuth } from '../../../../constants'
import { VanillaButton } from '../../../../components/VanillaButton'
import * as validators from '../../../../validators'
import ToolTipMessage from '../../../../components/ToolTipMessage/ToolTipMessage'

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

  /* Errors */
  const [formErrors, setFormErrors] = useState({
    email: [],
    password: []
  })

  /* Validators */
  const [formValidators] = useState({
    email: [validators.isRequired, validators.isEmail],
    password: [validators.isRequired]
  })

  /*
  Validate the form after a change
  */
  useEffect(() => {
    validateForm()
  }, [formData])

  /*
  Validate the form by iterating through the validators.
  We only add errors to the Array if the constraint failed, a.k.a returned
  something different than the empty string.
*/
  function validateForm () {
    const errors = {
      email: [],
      password: []
    }

    for (const [field, obj] of Object.entries(formValidators)) {
      obj.forEach(
        constraint => {
          if (formData[field].dirty) {
            const validationResult = constraint(formData[field].value)
            errors[field] = [...errors[field], validationResult]
          }
        }
      )
    }

    setFormErrors(errors)
  }

  /* Renders all the constraints and their status for a specific field to be used inside a Tooltip */
  function constraintsToTooltip (field) {
    if (formErrors[field].length !== 0) {
      return (
        <div className={style.toolTipContainer}>
          {formErrors[field].map((constraint, i) =>
            <ToolTipMessage key={i} check={constraint.success} message={constraint.description}/>
          )}
        </div>
      )
    }
    return ''
  }

  /**
 * Returns whether given field has errors
 * @param {string} field -> The form field identifier (ej.email)
 * @returns true if form field has errors, false otherwise
 */
  function fieldHasErrors (field) {
    let error = false
    formErrors[field].forEach(el => {
      if (el.success === false) error = true
    })
    return error
  }

  /**
   * Returns whether given field is ready for submission.
   * A field is ready when:
   * - The field has no errors
   * - The field is not required
   * - The field is required and dirty
   * @param {string} field -> The form field identifier (ej.email)
   * @returns true if form field is ready to submit, false otherwise
   */
  function readyForSubmit (field) {
    return !fieldHasErrors(field) &&
            (!formData[field].required || formData[field].dirty)
  }

  /**
   * Returns whether the form can be submitted.
   * @returns true if the form can be submited, false otherwise
   */
  function canSubmit () {
    for (const [field] of Object.entries(formErrors)) {
      if (!readyForSubmit(field)) return false
    }
    return true
  }

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
        <Tooltip
          placement={'left'}
          arrow
          title={constraintsToTooltip('email')}
          disableHoverListener={true}>
          <TextField
            variant='outlined'
            label='Correo electrónico'
            name='email'
            type='email'
            value={formData.email.value}
            onChange={e => handleInputChange(e)}
          />
          </Tooltip>

          <Tooltip
          placement={'left'}
          arrow
          title={constraintsToTooltip('password')}
          disableHoverListener={true}>
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
          </Tooltip>

         {authState.login.error && <p className={style.login__error}>{authState.login.errorMsg}</p>}
        <VanillaButton variant="contained" color="primary" type='submit' disabled={authState.login.loading || !canSubmit()} className={style['loginForm__button--primary']}>
           {!authState.login.loading && 'Iniciar sesión'}
           {authState.login.loading && <CircularProgress size={24}/>}
        </VanillaButton>
        </form>
      </div>
    </div>
  )
}

export default LoginComponent
