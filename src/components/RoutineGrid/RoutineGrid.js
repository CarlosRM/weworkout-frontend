/* eslint-disable react/prop-types */
import React from 'react'
import RoutineCard from '../RoutineCard/RoutineCard'

import style from './RoutineGrid.css'

const RoutineGrid = (props) => {
  return (
    <div className={style.main}>
        {props.title !== undefined && <div className={style.routineSlider__heading}>
          <h1>{props.title}</h1>
        </div>}
        <div className={style.routineSlider}>
          {props.routines.map((routine, index) =>
            <RoutineCard deleteRoutine={() => props.deleteRoutine(routine.id)} myRoutines={props.myRoutines} key={routine.id} routine={routine} hide={false} />
          )}
        </div>

        <div></div>
    </div>
  )
}

export default RoutineGrid
