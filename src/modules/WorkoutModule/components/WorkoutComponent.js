/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectWorkouts } from '../../../constants'
import style from './WorkoutComponent.css'
import WorkoutGrid from '../../../components/WorkoutGrid/WorkoutGrid'
import { ThinButton } from '../../../components/ThinButton'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { Link } from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add'

const WorkoutComponent = (props) => {
  const workoutState = useSelector(selectWorkouts)

  const [showAll, setShowAll] = useState(true)

  const [startingDate, setStartingDate] = useState(new Date())
  const [endingDate, setEndingDate] = useState(new Date())

  function sortByDate (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.date) - new Date(a.date)
  }

  function getWorkouts () {
    const workouts = [...workoutState.allMyWorkouts].sort(sortByDate)
    if (!showAll) {
      return workouts.filter(workout => {
        const workoutDate = new Date(workout.date)
        return workoutDate >= startingDate && workoutDate <= endingDate
      })
    }
    return workouts
  }

  function handleStartingDateChange (date) {
    setStartingDate(date)
    setShowAll(false)
  }

  function handleEndingDateChange (date) {
    setEndingDate(date)
    setShowAll(false)
  }

  const workouts = getWorkouts()

  return (
    <div className={style.main}>
        <div className={style.myWorkouts__heading}>
          <h1>Mis registros de ejercicio</h1>
          <Link to='/add-workout'><ThinButton className={style.myWorkouts__addWorkout}><AddIcon></AddIcon>Añadir registro de ejercicio</ThinButton></Link>
        </div>
        <div className={style.workouts__controls}>
          <div className={style.workouts__control}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Inicio"
                format="MM/dd/yyyy"
                value={startingDate}
                onChange={handleStartingDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>
          </div>

          <div className={style.workouts__control}>
            <MuiPickersUtilsProvider className={style.workouts__control} utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Fin"
                format="MM/dd/yyyy"
                value={endingDate}
                onChange={handleEndingDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          {!showAll && <ThinButton onClick={() => setShowAll(true)}>Mostrar todos</ThinButton>}
        </div>
        {workouts.length > 0 &&
        <div>
          {showAll && <p>Mostrando todos</p>}
          {!showAll && <p>{`Mostrando desde ${startingDate.toLocaleDateString('es')} hasta ${endingDate.toLocaleDateString('es')}`}</p>}
          <WorkoutGrid workouts={workouts}></WorkoutGrid>
        </div>}
        {workouts.length === 0 &&
          <p>Aún no has añadido ningún workout</p>
        }
    </div>
  )
}

export default WorkoutComponent
