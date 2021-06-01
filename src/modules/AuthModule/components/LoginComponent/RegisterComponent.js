import React, { useEffect, useState } from 'react'

import style from './RegisterComponent.css'

import { CircularProgress, FormControlLabel, IconButton, InputAdornment, Radio, RadioGroup, TextField, Tooltip } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth } from '../../../../constants'
import { VanillaButton } from '../../../../components/VanillaButton'
import * as validators from '../../../../validators'
import ToolTipMessage from '../../../../components/ToolTipMessage/ToolTipMessage'
import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { register } from '../../reducers/AuthReducer'
import { Redirect } from 'react-router'

const RegisterComponent = () => {
  const authState = useSelector(selectAuth)
  /* Form fields */
  const [formData, setFormData] = useState({
    name: {
      value: '',
      dirty: false,
      required: true
    },
    email: {
      value: '',
      dirty: false,
      required: true
    },
    genre: {
      value: '',
      dirty: false,
      required: true
    },
    birthdate: {
      value: Date.now(),
      dirty: true,
      required: true
    },
    password: {
      value: '',
      required: true,
      dirty: false
    },
    confirmPassword: {
      value: '',
      required: true,
      dirty: false
    },
    showPassword: false,
    showPasswordConfirm: false,
    submitted: false
  })

  /* Errors */
  const [formErrors, setFormErrors] = useState({
    name: [],
    email: [],
    genre: [],
    birthdate: [],
    password: [],
    confirmPassword: []
  })

  /* Validators */
  const [formValidators] = useState({
    name: [validators.isRequired],
    email: [validators.isRequired, validators.isEmail],
    genre: [validators.isRequired],
    birthdate: [validators.isRequired],
    password: [validators.isRequired],
    confirmPassword: [validators.isRequired]
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
      name: [],
      email: [],
      genre: [],
      birthdate: [],
      password: [],
      confirmPassword: []
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

    if (formData.password.value !== formData.confirmPassword.value) return false
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

  const handleClickShowConfirmPassword = () => {
    setFormData({
      ...formData,
      showConfirmPassword: !formData.showConfirmPassword
    })
  }

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault()
  }

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      birthdate: {
        value: date,
        dirty: true
      }
    })
  }

  const submit = (e) => {
    e.preventDefault()
    const data = {
      body: {
        name: formData.name.value,
        email: formData.email.value,
        genre: formData.genre.value,
        birthdate: formData.birthdate.value,
        password: formData.password.value,
        confirmPassword: formData.confirmPassword.value
      }
    }
    setFormData({ ...formData, submitted: true })
    dispatch(register(data))
  }

  return (
    <div className={style.hero}>
       {formData.submitted && authState.register.success && <Redirect to='/login'></Redirect>}
      <div className={style.hero__catch}>
        <h1 className={style.hero__title}>
          Regístrate
        </h1>
        <form onSubmit={submit} className={style.registerForm}>
        <Tooltip
          placement={'left'}
          arrow
          title={constraintsToTooltip('name')}
          disableHoverListener={true}>
          <TextField
            variant='outlined'
            label='Nombre'
            name='name'
            type='text'
            value={formData.name.value}
            onChange={e => handleInputChange(e)}
          />
          </Tooltip>

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

          <RadioGroup aria-label="genre" name="genre" value={formData.genre.value} onChange={handleInputChange}>
              <FormControlLabel value="Hombre" control={<Radio />} label="Hombre" />
              <FormControlLabel value="Mujer" control={<Radio />} label="Mujer" />
            </RadioGroup>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Fecha de nacimiento"
                format="MM/dd/yyyy"
                value={formData.birthdate.value}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>

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

          <Tooltip
          placement={'left'}
          arrow
          title={constraintsToTooltip('confirmPassword')}
          disableHoverListener={true}>
          <TextField
            variant='outlined'
            label='Confimar contraseña'
            name='confirmPassword'
            type={formData.showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword.value}
            onChange={e => handleInputChange(e)}
            InputProps = {{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                  >{formData.showPassword ? <Visibility /> : <VisibilityOff />}</IconButton>
                </InputAdornment>
              )
            }}
          />
          </Tooltip>

         {authState.register.error && <p className={style.register__error}>{authState.register.errorMsg}</p>}
        <VanillaButton variant="contained" color="primary" type='submit' disabled={authState.register.loading || !canSubmit()} className={style['registerForm__button--primary']}>
           {!authState.register.loading && 'Regístrate'}
           {authState.register.loading && <CircularProgress size={24}/>}
        </VanillaButton>
        </form>
      </div>
    </div>
  )
}

export default RegisterComponent
