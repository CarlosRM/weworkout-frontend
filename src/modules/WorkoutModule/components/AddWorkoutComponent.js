/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import { VanillaButton } from '../../../components/VanillaButton'
import { selectAuth, selectExercises, selectWorkouts } from '../../../constants'
import * as validators from '../../../validators'
import ToolTipMessage from '../../../components/ToolTipMessage/ToolTipMessage'

import style from './AddWorkoutComponent.css'
import { Card, CardContent, Select, TextField, Tooltip } from '@material-ui/core'

import ClearIcon from '@material-ui/icons/Clear'
import { Redirect } from 'react-router'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { addWorkout } from '../reducers/WorkoutReducer'

const AddWorkoutComponent = (props) => {
  const authState = useSelector(selectAuth)
  const exercisesState = useSelector(selectExercises)
  const workoutsState = useSelector(selectWorkouts)

  /* Form fields */
  const [formData, setFormData] = useState({
    name: {
      value: '',
      dirty: true,
      required: true
    },
    notes: {
      value: '',
      required: true,
      dirty: false
    },
    date: {
      value: new Date(),
      required: true,
      dirty: true
    },
    weight: {
      value: '',
      required: true,
      dirty: false
    },
    fat_percentage: {
      value: '',
      required: true,
      dirty: false
    },
    selectedExercise: {
      value: exercisesState.allExercises[0].id,
      required: true,
      dirty: false
    },
    selectedRepetitions: {
      value: 1,
      required: true,
      dirty: false
    },
    selectedWeight: {
      value: 0,
      required: true,
      dirty: false
    },
    sets: [],
    submitted: false
  })

  /* Errors */
  const [formErrors, setFormErrors] = useState({
    name: [],
    notes: [],
    date: [],
    weight: [],
    fat_percentage: []
  })

  /* Validators */
  const [formValidators] = useState({
    name: [validators.isRequired],
    notes: [validators.isRequired],
    date: [validators.isRequired],
    weight: [validators.isRequired],
    fat_percentage: [validators.isRequired]
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
      notes: [],
      date: [],
      weight: [],
      fat_percentage: []
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

    if (formData.sets.length === 0) return false

    return true
  }

  /* Grab useDispatch to use it later */
  const dispatch = useDispatch()

  const submit = (e) => {
    e.preventDefault()
    const data = {
      token: new Cookies().get('WeWorkoutToken'),
      body: {
        user_id: authState.user.id,
        name: formData.name.value,
        notes: formData.notes.value,
        date: formData.date.value.toISOString().slice(0, 19).replace('T', ' '),
        weight: formData.weight.value,
        fat_percentage: formData.fat_percentage.value,
        sets: formData.sets
      }
    }
    dispatch(addWorkout(data))
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

  const handleAddNewExercise = () => {
    setFormData(
      {
        ...formData,
        sets: [...formData.sets, { exercise: formData.selectedExercise.value, repetitions: formData.selectedRepetitions.value, weight: formData.selectedWeight.value, id: formData.sets.length }]
      }
    )
  }

  const clearSet = (id) => {
    setFormData(
      {
        ...formData,
        sets: formData.sets.filter(el => el.id !== id)
      }
    )
  }

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: {
        value: date,
        dirty: true
      }
    })
  }

  return (
    <div className={style.main}>
      {formData.submitted && workoutsState.addWorkout.success && <Redirect to='/my-workouts'></Redirect>}
      <h1 className={style.createWorkout__title}>Nuevo registro de ejercicio</h1>
      <div className={style.createWorkoutWrapper}>
        <div className={`${style.column} ${style.firstColumn}`}>
          <form onSubmit={submit} className={style.createWorkoutForm}>
            <Tooltip
              placement={'right'}
              arrow
              title={constraintsToTooltip('name')}
              disableHoverListener={true}>
              <TextField
                variant='outlined'
                label='Título'
                name='name'
                type='text'
                value={formData.name.value}
                onChange={e => handleInputChange(e)}
              />
            </Tooltip>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Fecha"
                format="MM/dd/yyyy"
                value={formData.date.value}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>

            <Tooltip
              placement={'right'}
              arrow
              title={constraintsToTooltip('weight')}
              disableHoverListener={true}>
              <TextField
                variant='outlined'
                label='Peso (kg)'
                name='weight'
                type='number'
                value={formData.weight.value}
                onChange={e => handleInputChange(e)}
                InputProps={{ inputProps: { min: 0, max: 250 } }}
              />
            </Tooltip>

            <Tooltip
              placement={'right'}
              arrow
              title={constraintsToTooltip('fat_percentage')}
              disableHoverListener={true}>
              <TextField
                variant='outlined'
                label='% Grasa'
                name='fat_percentage'
                type='number'
                value={formData.fat_percentage.value}
                onChange={e => handleInputChange(e)}
                InputProps={{ inputProps: { min: 0, max: 100 } }}
              />
            </Tooltip>

            <Tooltip
              placement={'right'}
              arrow
              title={constraintsToTooltip('notes')}
              disableHoverListener={true}>
              <TextField
                variant='outlined'
                label='Notas'
                name='notes'
                type='textarea'
                multiline
                rows={20}
                rowsMax={20}
                value={formData.notes.value}
                onChange={e => handleInputChange(e)}
              />
            </Tooltip>
          <VanillaButton variant="contained" color="primary" type='submit' disabled={!canSubmit()} className={style['createWorkoutForm__button--primary']}>
            Publicar
          </VanillaButton>
          </form>
        </div>

        <div className={style.column}>
            <h2>Ejercicios</h2>
            {formData.sets.map((el, idx) =>
              <Card key={idx} className={style.workout__exerciseCard} style={{ marginBottom: '1rem' }}>
                <CardContent>
                  <div className={style.workout__exercise}>
                    <span>{exercisesState.allExercises.find(ex => ex.id === parseInt(el.exercise)).name}</span>
                    <span className={style.set__repetitions}>Reps: {el.repetitions} </span>
                    <span className={style.set__weight}>Peso: {el.weight} kg</span>
                    <ClearIcon className={style.clearSet} onClick={() => clearSet(el.id)}/>
                  </div>
                </CardContent>
              </Card>
            )}
            <div className={style.addExercise}>
            <Select
                className={style.select}
                native
                value={formData.selectedExercise.value}
                onChange={e => handleInputChange(e)}
                inputProps={{
                  name: 'selectedExercise',
                  id: 'selectedExercise'
                }}
              >
              {exercisesState.allExercises.map((el, idx) =>
                <option key={el.id} value={el.id}>{el.name}</option>
              )}
              </Select>
            <Select
              className={style.select}
              native
              value={formData.selectedRepetitions.value}
              onChange={e => handleInputChange(e)}
              inputProps={{
                name: 'selectedRepetitions',
                id: 'selectedRepetitions'
              }}
            >
              {[...Array(30)].map((el, idx) =>
                <option key={idx + 1} value={idx + 1}>{idx + 1} repeticiones</option>
              )}
            </Select>
            <Select
              className={style.select}
              native
              value={formData.selectedWeight.value}
              onChange={e => handleInputChange(e)}
              inputProps={{
                name: 'selectedWeight',
                id: 'selectedWeight'
              }}
            >
              {[...Array(250)].map((el, idx) =>
                <option key={idx} value={idx}>{idx} kg</option>
              )}
            </Select>
            </div>
            <VanillaButton onClick={handleAddNewExercise}>Añadir nuevo ejercicio</VanillaButton>

        </div>
      </div>
    </div>
  )
}

export default AddWorkoutComponent
