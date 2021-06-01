/* eslint-disable react/prop-types */
import React from 'react'
import WorkoutCard from '../WorkoutCard/WorkoutCard'

import style from './WorkoutGrid.css'

const WorkoutGrid = (props) => {
  return (
    <div className={style.main}>
        {props.title !== undefined && <div className={style.workoutSlider__heading}>
          <h1>{props.title}</h1>
        </div>}
        <div className={style.workoutSlider}>
          {props.workouts.map((workout, index) =>
            <WorkoutCard key={workout.id} workout={workout} hide={false} />
          )}
        </div>
    </div>
  )
}

export default WorkoutGrid
