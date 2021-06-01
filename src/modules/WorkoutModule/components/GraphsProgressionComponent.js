/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectExercises, selectWorkouts } from '../../../constants'

import style from './GraphsProgressionComponent.css'
import { Select } from '@material-ui/core'

import { Line } from 'react-chartjs-2'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const GraphsProgressionComponent = (props) => {
  const exercisesState = useSelector(selectExercises)
  const workoutState = useSelector(selectWorkouts)

  const graphTypes = [{
    id: 'maxORM',
    name: 'Max. ORM',
    description: 'El máximo peso a una repetición'
  },
  {
    id: 'maxReps',
    name: 'Max. Reps',
    description: 'El número máximo de repeticiones'
  }
  ]

  /* Form fields */
  const [formData, setFormData] = useState({
    selectedExercise: {
      value: exercisesState.allExercises[0].id,
      required: true,
      dirty: false
    },
    selectedType: {
      value: graphTypes[0].id,
      required: true,
      dirty: false
    },
    startingDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
    endingDate: new Date()
  })

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

  function sortByDate (a, b) {
    const aDate = new Date(a.date)
    const bDate = new Date(b.date)
    return aDate - bDate
  }

  function generateMaxRepsData () {
    const exercise = formData.selectedExercise.value

    const data = []
    const labels = []

    const workouts = [...workoutState.allMyWorkouts].sort(sortByDate)

    workouts.forEach(workout => {
      const workoutDate = new Date(workout.date)
      if (workoutDate >= formData.startingDate && workoutDate < formData.endingDate) {
        let maxReps = -1
        workout.sets.forEach(set => {
          if (set.exercise_id === parseInt(exercise)) {
            if (set.repetitions > maxReps) maxReps = set.repetitions
          }
        })
        if (maxReps !== -1) {
          data.push(maxReps)
          labels.push(workout.date)
        }
      }
    })

    return {
      labels: labels,
      datasets: [
        {
          data: data,
          label: 'Max Reps / Tiempo',
          backgroundColor: 'rgba(3, 169, 244, 0.5)',
          borderColor: 'rgb(3, 169, 244)',
          fill: false
        }
      ]
    }
  }

  function generateMaxORMData () {
    const exercise = formData.selectedExercise.value

    const data = []
    const labels = []

    const workouts = [...workoutState.allMyWorkouts].sort(sortByDate)

    workouts.forEach(workout => {
      const workoutDate = new Date(workout.date)
      if (workoutDate >= formData.startingDate && workoutDate < formData.endingDate) {
        let maxWeight = -1
        workout.sets.forEach(set => {
          if (set.exercise_id === parseInt(exercise)) {
            if (set.pivot.weight > maxWeight) maxWeight = set.pivot.weight
          }
        })
        if (maxWeight !== -1) {
          data.push(maxWeight)
          labels.push(workout.date)
        }
      }
    })

    return {
      labels: labels,
      datasets: [
        {
          data: data,
          label: 'Max ORM / Tiempo',
          backgroundColor: 'rgba(3, 169, 244, 0.5)',
          borderColor: 'rgb(3, 169, 244)',
          fill: false
        }
      ]
    }
  }

  function generateData () {
    if (formData.selectedType.value === 'maxReps') return generateMaxRepsData()
    else if (formData.selectedType.value === 'maxORM') return generateMaxORMData()
  }

  function handleStartingDateChange (date) {
    setFormData({
      ...formData,
      startingDate: date
    })
  }

  function handleEndingDateChange (date) {
    setFormData({
      ...formData,
      endingDate: date
    })
  }

  return (
    <div className={style.main}>
      <h1>Gráficos de progreso</h1>
      <div className={style.content}>
        <div className={style.graphControls}>
          <form>
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
            value={formData.selectedType.value}
            onChange={e => handleInputChange(e)}
            inputProps={{
              name: 'selectedType',
              id: 'selectedType'
            }}
          >
          {graphTypes.map((el, idx) =>
            <option key={el.id} value={el.id}>{el.name}</option>
          )}
          </Select>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Inicio"
              format="MM/dd/yyyy"
              value={formData.startingDate}
              onChange={handleStartingDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Inicio"
              format="MM/dd/yyyy"
              value={formData.endingDate}
              onChange={handleEndingDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
          </form>
        </div>
        <div className={style.graphContainer}>
        <Line
            data={generateData}
            options={{
              scales: {
                xAxes:
                  {
                    ticks: {
                      maxTicksLimit: 8,
                      maxRotation: 90,
                      minRotation: 90
                    }
                  }
              },
              bezierCurve: true,
              lineTension: 0.2
            }}></Line>
        </div>
      </div>
    </div>
  )
}

export default GraphsProgressionComponent
