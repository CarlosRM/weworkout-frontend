/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector } from 'react-redux'
import { selectCategories, selectRoutines, selectUsers } from '../../../constants'
import { VanillaButton } from '../../../components/VanillaButton'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import VisibilityIcon from '@material-ui/icons/Visibility'
import ChatIcon from '@material-ui/icons/Chat'
import StarIcon from '@material-ui/icons/Star'

import style from './RoutineComponent.css'
import { Avatar, Card, CardContent } from '@material-ui/core'
import { Link } from 'react-router-dom'

const RoutineComponent = (props) => {
  const routinesState = useSelector(selectRoutines)
  const categoriesState = useSelector(selectCategories)
  const usersState = useSelector(selectUsers)

  const routine = routinesState.allRoutines.find(el => el.id === parseInt(props.match.params.id))

  return (
    <div className={style.main}>
      <div className={`${style.column} ${style.firstColumn}`}>
        <div className={style.routine__heading}>
          <h1 className={style.routine__title}>{routine.name}</h1>
            <Link to={`/users/${routine.user_id}`}>
              <div className={style.routine__headingAuthor}>
                <Avatar>
                  {usersState.allUsers.find(user => user.id === routine.user_id).name.slice(0, 1).toUpperCase()}
                </Avatar>
                <span className={style.routine__commentAuthorName}>{usersState.allUsers.find(user => user.id === routine.user_id).name}</span>
              </div>
            </Link>
            <div className={style.routine__headingCategories}>
              {routine.bodyparts.map((el, idx) =>
                <span key={el}>{idx !== 0 ? ` · ${el}` : el}</span>
              )}

              {routine.categories.map((el, idx) =>
                <span key={el}>{` · ${categoriesState.allCategories.find(cat => cat.id === el).name}`}</span>
              )}
            </div>
            <div className={style.routine__stats}>
              <div className={`${style.routine__rating} ${style.routine__stat}`}>
                <StarIcon></StarIcon>
                <span>{Math.round(routine.rating * 10) / 10}</span>
              </div>
              <div className={`${style.routine__comments} ${style.routine__stat}`}>
                <ChatIcon></ChatIcon>
                <span>{routine.comments.length}</span>
              </div>
              <div className={`${style.routine__views} ${style.routine__stat}`}>
                <VisibilityIcon></VisibilityIcon>
                <span></span>
              </div>
            </div>
            <div className={style.routine__controls}>
                <VanillaButton className={style.routine__control}>Descargar</VanillaButton>
                <VanillaButton className={style.routine__control}><FavoriteBorderIcon></FavoriteBorderIcon></VanillaButton>
                <VanillaButton className={style.routine__control}><StarBorderIcon></StarBorderIcon></VanillaButton>
            </div>
          </div>
          <div className={style.routine__notes}>
            <h2>Notas</h2>
            <p>{routine.description}</p>
          </div>
      </div>
      <div className={`${style.column} ${style.secondColumn}`}>
        <h2>Ejercicios</h2>
        <div className={style.routine__exercises}>
          {routine.sets.map((el, idx) =>
          <Link key={idx} to={`/exercise/${el.exercise.id}`}>
            <Card className={style.routine__exerciseCard} >
              <CardContent>
                <div className={style.routine__exercise}>
                  <span>{el.exercise.name}</span>
                  <span>Repeticiones: {el.repetitions} </span>
                </div>
              </CardContent>
            </Card>
          </Link>
          )}
        </div>
        <h2>Comentarios</h2>
        <div className={style.routine__comments}>
          {routine.comments.length === 0 && <p>Aún no hay comentarios.</p>}
          {routine.comments.length > 0 && routine.comments.map((el, idx) =>
            <Card className={style.routine__commentCard} key={idx}>
              <CardContent>
                <div className={style.routine__comment}>
                  <div className={style.routine__commentAuthor}>
                  <Link to={`/users/${el.user_id}`}>
                  <Avatar>
                    {usersState.allUsers.find(user => user.id === el.user_id).name.slice(0, 1).toUpperCase()}
                  </Avatar>
                  </Link>
                  <Link to={`/users/${el.user_id}`}>
                    <span className={style.routine__commentAuthorName}>{usersState.allUsers.find(user => user.id === el.user_id).name}</span>
                  </Link>
                  <span className={style.routine__commentDate}>{el.created_at.slice(0, 10)}</span>
                  </div>
                  <p className={style.routine__commentContent}>{el.content}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <div className={`${style.column} ${style.thirdColumn}`}>
      <h2>Similares</h2>
          {routinesState.allRoutines.filter(el => routine.similar.includes(el.id)).map((ex, idx) =>
          <Link key={idx} to={`/routine/${ex.id}`} className={style.similar}>
            <Card>
              <CardContent>
                <h3>{ex.name}</h3>
              </CardContent>
            </Card>
          </Link>
          )}
      </div>
    </div>
  )
}

export default RoutineComponent
