/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import { VanillaButton } from '../../../components/VanillaButton'
import { selectAuth, selectCategories, selectExercises, selectRoutines } from '../../../constants'
import { editRoutine } from '../reducers/RoutinesReducer'
import * as validators from '../../../validators'
import ToolTipMessage from '../../../components/ToolTipMessage/ToolTipMessage'

import style from './EditRoutineComponent.css'
import { Card, CardContent, Select, TextField, Tooltip } from '@material-ui/core'

import ClearIcon from '@material-ui/icons/Clear'
import { Redirect } from 'react-router'

const EditRoutineComponent = (props) => {
  const routinesState = useSelector(selectRoutines)
  const authState = useSelector(selectAuth)
  const exercisesState = useSelector(selectExercises)
  const categoriesState = useSelector(selectCategories)

  const routine = routinesState.allRoutines.find(el => el.id === parseInt(props.match.params.id))

  /* Form fields */
  const [formData, setFormData] = useState({
    name: {
      value: routine.name,
      dirty: true,
      required: true
    },
    description: {
      value: routine.description,
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
    selectedCategory: {
      value: categoriesState.allCategories[0].id,
      required: true,
      dirty: false
    },
    sets: routine.sets.map(el => { return { exercise: el.exercise.id, repetitions: el.repetitions, id: el.id } }),
    categories: routine.categories,
    submitted: false
  })

  /* Errors */
  const [formErrors, setFormErrors] = useState({
    name: [],
    description: []
  })

  /* Validators */
  const [formValidators] = useState({
    name: [validators.isRequired],
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

    if (formData.sets.length === 0) return false
    if (formData.categories.length === 0) return false
    return true
  }

  /* Grab useDispatch to use it later */
  const dispatch = useDispatch()

  const submit = (e) => {
    e.preventDefault()
    const data = {
      token: new Cookies().get('WeWorkoutToken'),
      id: routine.id,
      body: {
        user_id: authState.user.id,
        name: formData.name.value,
        description: formData.description.value,
        visualizations: 0,
        sets: formData.sets,
        categories: formData.categories
      }
    }
    dispatch(editRoutine(data))
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
        sets: [...formData.sets, { exercise: formData.selectedExercise.value, repetitions: formData.selectedRepetitions.value, id: formData.sets.length }]
      }
    )
  }

  const handleAddNewCategory = () => {
    setFormData(
      {
        ...formData,
        categories: formData.categories.indexOf(formData.selectedCategory.value) === -1 ? [...formData.categories, formData.selectedCategory.value] : formData.categories
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

  const clearCategory = (id) => {
    setFormData(
      {
        ...formData,
        categories: formData.categories.filter(el => el !== id)
      }
    )
  }

  return (
    <div className={style.main}>
      {authState.user.id !== routine.user_id && <Redirect to='/my-routines'></Redirect>}
      {formData.submitted && routinesState.editRoutine.success && <Redirect to='/my-routines'></Redirect>}
      <h1 className={style.createRoutine__title}>Editar Rutina</h1>
      <div className={style.createRoutineWrapper}>
        <div className={`${style.column} ${style.firstColumn}`}>
          <form onSubmit={submit} className={style.createRoutineForm}>
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
          <VanillaButton variant="contained" color="primary" type='submit' disabled={!canSubmit()} className={style['createRoutineForm__button--primary']}>
            Publicar
          </VanillaButton>
          </form>
        </div>

        <div className={style.column}>
            <h2>Ejercicios</h2>
            {formData.sets.map((el, idx) =>
              <Card key={idx} className={style.routine__exerciseCard} style={{ marginBottom: '1rem' }}>
                <CardContent>
                  <div className={style.routine__exercise}>
                    <span>{exercisesState.allExercises.find(ex => ex.id === parseInt(el.exercise)).name}</span>
                    <span className={style.set__repetitions}>Repeticiones: {el.repetitions} </span>
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
                <option key={idx + 1} value={idx + 1}>{idx + 1}</option>
              )}
            </Select>
            </div>
            <VanillaButton onClick={handleAddNewExercise}>Añadir nuevo ejercicio</VanillaButton>

        </div>
        <div className={style.column}>
            <h2>Categorías</h2>
            {formData.categories.map((el, idx) =>
              <Card key={idx} className={style.routine__exerciseCard} style={{ marginBottom: '1rem' }}>
                <CardContent>
                  <div className={style.routine__exercise}>
                    <span>{categoriesState.allCategories.find(cat => cat.id === parseInt(el)).name}</span>
                    <ClearIcon className={style.clearCategory} onClick={() => clearCategory(el)}/>
                  </div>
                </CardContent>
              </Card>
            )}
            <Select
                native
                value={formData.selectedCategory.value}
                onChange={e => handleInputChange(e)}
                inputProps={{
                  name: 'selectedCategory',
                  id: 'selectedCategory'
                }}
                style={{ marginTop: '1rem', marginBottom: '1rem' }}
              >
              {categoriesState.allCategories.map((el, idx) =>
                <option key={el.id} value={el.id}>{el.name}</option>
              )}
            </Select>
            <VanillaButton onClick={handleAddNewCategory}>Añadir nueva categoría</VanillaButton>
        </div>
      </div>
    </div>
  )
}

export default EditRoutineComponent
