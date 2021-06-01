/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import RoutineCard from '../RoutineCard/RoutineCard'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import style from './RoutineSlider.css'
import useWindowDimensions from '../../utils/hooks/useWindowDimensions'
import { Link } from 'react-router-dom'

const RoutineSlider = (props) => {
  const [expanded, setExpanded] = useState(false)
  const { width } = useWindowDimensions()

  function handleShowMoreClick () {
    setExpanded(true)
  }

  function getThreshold () {
    let threshold = 0
    if (width > 500) threshold = 1
    if (width > 800) threshold = 2
    if (width > 1200) threshold = 3
    if (width > 1500) threshold = 4
    return threshold
  }

  return (
    <div className={style.main}>
        <div className={style.routineSlider__heading}>
          <h1>{props.title}</h1>
          <Link className={style.routineSlider__seeAll} to={`/${props.type}/${props.title}`}>Ver todo de {props.title}</Link>
        </div>
        <div className={style.routineSlider}>
          {props.routines.map((routine, index) =>
            <RoutineCard key={routine.id} routine={routine} hide={index > getThreshold() && !expanded} />
          )}
        </div>
        {!expanded && <div className={style.routineSlider__showMore}>
            <button className={style.routineSlider__expandMore} onClick={handleShowMoreClick}>
              <ExpandMoreIcon></ExpandMoreIcon>
            </button>
        </div>}
    </div>
  )
}

export default RoutineSlider
