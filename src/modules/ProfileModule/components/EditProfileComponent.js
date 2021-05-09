/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import { VanillaButton } from '../../../components/VanillaButton'
import { selectAuth, selectCategories, selectExercises, selectRoutines } from '../../../constants'
import { addRoutine, editRoutine } from '../../RoutinesModule/reducers/RoutinesReducer'
import * as validators from '../../../validators'
import ToolTipMessage from '../../../components/ToolTipMessage/ToolTipMessage'

import style from './EditProfileComponent.css'
import { Card, CardContent, FormControlLabel, Radio, RadioGroup, Select, TextField, Tooltip } from '@material-ui/core'

import {
  KeyboardDatePicker, MuiPickersUtilsProvider
} from '@material-ui/pickers'

import DateFnsUtils from '@date-io/date-fns'

import ClearIcon from '@material-ui/icons/Clear'
import { Redirect } from 'react-router'
import { edit } from '../../AuthModule/reducers/AuthReducer'

const EditProfileComponent = (props) => {
  const routinesState = useSelector(selectRoutines)
  const authState = useSelector(selectAuth)
  const exercisesState = useSelector(selectExercises)
  const categoriesState = useSelector(selectCategories)

  const user = authState.user

  /* Form fields */
  const [formData, setFormData] = useState({
    name: {
      value: user.name,
      dirty: true,
      required: true
    },
    genre: {
      value: user.genre,
      dirty: true,
      required: true
    },
    birthday: {
      value: new Date(user.birthdate),
      dirty: true,
      required: true
    },
    description: {
      value: user.description,
      required: true,
      dirty: false
    },
    submitted: false
  })

  /* Errors */
  const [formErrors, setFormErrors] = useState({
    name: [],
    genre: [],
    birthday: [],
    description: []
  })

  /* Validators */
  const [formValidators] = useState({
    name: [validators.isRequired],
    genre: [validators.isRequired],
    birthday: [validators.isRequired],
    description: [validators.isRequired]
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
      genre: [],
      birthday: [],
      description: []
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
 * @param {string} field -> The form field identifier (ej.genre)
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
   * @param {string} field -> The form field identifier (ej.genre)
   * @returns true if form field is ready to submit, false otherwise
   */
  function readyForSubmit (field) {
    return !fieldHasErrors(field)
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

  const submit = (e) => {
    e.preventDefault()
    const data = {
      token: new Cookies().get('WeWorkoutToken'),
      id: user.id,
      body: {
        user_id: user.id,
        name: formData.name.value,
        genre: formData.genre.value,
        birthdate: formData.birthday.value.toISOString().slice(0, 19).replace('T', ' '),
        description: formData.description.value
      }
    }
    console.log(data)
    dispatch(edit(data))
    setFormData({ ...formData, submitted: true })
  }

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

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      birthday: {
        value: date,
        dirty: true
      }
    })
  }

  return (
    <div className={style.main}>
      {formData.submitted && authState.edit.success && <Redirect to='/profile'></Redirect>}
      <h1 className={style.editUser__title}>Editar Datos</h1>
      <div className={style.editUserWrapper}>
        <div className={`${style.column} ${style.firstColumn}`}>
          <form onSubmit={submit} className={style.editUserForm}>
            <Tooltip
              placement={'right'}
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
                value={formData.birthday.value}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>

            <Tooltip
              placement={'right'}
              arrow
              title={constraintsToTooltip('description')}
              disableHoverListener={true}>
              <TextField
                variant='outlined'
                label='Descripción'
                name='description'
                type='textarea'
                multiline
                rows={20}
                rowsMax={20}
                value={formData.description.value}
                onChange={e => handleInputChange(e)}
              />
            </Tooltip>
          <VanillaButton variant="contained" color="primary" type='submit' disabled={!canSubmit()} className={style['editRoutineForm__button--primary']}>
            Editar
          </VanillaButton>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfileComponent
