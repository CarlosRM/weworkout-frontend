/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector } from 'react-redux'

import style from './ExerciseComponent.css'
import { Card, CardContent } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { selectExercises } from '../../../constants'

const ExerciseComponent = (props) => {
  const exercisesState = useSelector(selectExercises)

  const exercise = exercisesState.allExercises.find(el => el.id === parseInt(props.match.params.id))

  return (
    <div className={style.main}>
      <div className={style.exercise__heading}>
        <h1 className={style.exercise__title}>{exercise.name}</h1>
      </div>
      <div className={style.content}>
        <div className={`${style.column} ${style.firstColumn}`}>
          <div className={style.exercise__description}>
            <h2>Descripción</h2>
            <p>{exercise.description}</p>
          </div>
        </div>
        <div className={`${style.column} ${style.secondColumn}`}>
        <h2>Demostración</h2>
        <div className={style.container}>
          <iframe className={style.video} src={exercise.videoURL} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <p className={style.disclaimer}>DISCLAIMER: Este y todo el resto de vídeos y material multimedia son propiedad de sus respectivos autores. Se utilizan en este proyecto bajo fines puramente educativos y sin ningún ánimo de lucro.</p>
        </div>
        <div className={`${style.column} ${style.thirdColumn}`}>
          <div className={style.exercise__similars}>
            <h2>Similares</h2>
            {exercisesState.allExercises.filter(el => exercise.similar.includes(el.id)).map((ex, idx) =>
            <Link key={idx} to={`/exercise/${ex.id}`} className={style.similar}>
              <Card>
                <CardContent>
                  <h3>{ex.name}</h3>
                </CardContent>
              </Card>
            </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExerciseComponent
