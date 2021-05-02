/* eslint-disable react/prop-types */
import React from 'react'
import ExerciseCard from '../ExerciseCard/ExerciseCard'

import style from './ExerciseGrid.css'

const ExerciseGrid = (props) => {
  return (
    <div className={style.main}>
        {props.title !== undefined && <div className={style.exerciseSlider__heading}>
          <h1>{props.title}</h1>
        </div>}
        <div className={style.exerciseSlider}>
          {props.exercises.map((exercise, index) =>
            <ExerciseCard key={exercise.id} exercise={exercise} hide={false} />
          )}
        </div>
    </div>
  )
}

export default ExerciseGrid
