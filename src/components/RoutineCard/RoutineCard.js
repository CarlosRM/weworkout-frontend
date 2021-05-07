/* eslint-disable react/prop-types */
import React from 'react'

import style from './RoutineCard.css'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import VisibilityIcon from '@material-ui/icons/Visibility'
import ChatIcon from '@material-ui/icons/Chat'
import StarIcon from '@material-ui/icons/Star'
import { withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { selectAuth, selectUsers } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { VanillaButton } from '../VanillaButton'
import Cookies from 'universal-cookie'
import { deleteRoutine } from '../../modules/RoutinesModule/reducers/RoutinesReducer'
import { ThinButtonRed } from '../ThinButtonRed'
import { ThinButton } from '../ThinButton'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

const CustomCard = withStyles((theme) => ({
  root: {
  }
}))(Card)

const CustomCardContent = withStyles((theme) => ({
  root: {
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column'
  }
}))(CardContent)

const RoutineCard = (props) => {
  const usersState = useSelector(selectUsers)
  const authState = useSelector(selectAuth)

  return (
    <div className={`${style.card__wrapper} ${props.hide ? style.card__hide : style.card__show}`}>
      <Link to={`/routine/${props.routine.id}`}>
        <CustomCard className={style.card}>
          <CustomCardContent>
            <div className={style.card__header}>
              <Avatar>
              {usersState.allUsers.find(user => user.id === props.routine.user_id).name.slice(0, 1).toUpperCase()}
              </Avatar>
              <h3 className={style.card__title}>{props.routine.name}</h3>
            </div>
            <p className={style.card__description}>{props.routine.description}</p>
            <div className={style.card__stats}>
              <div className={`${style.card__rating} ${style.card__stat}`}>
                <StarIcon></StarIcon>
                <span>{Math.round(props.routine.rating * 10) / 10}</span>
              </div>
              <div className={`${style.card__comments} ${style.card__stat}`}>
                <ChatIcon></ChatIcon>
                <span>{props.routine.comments.length}</span>
              </div>
              <div className={`${style.card__views} ${style.card__stat}`}>
                <VisibilityIcon></VisibilityIcon>
                <span></span>
              </div>
            </div>
          </CustomCardContent>
        </CustomCard>
      </Link>
      {props.myRoutines && authState.user.routines.includes(props.routine.id) &&
      <div className={style.card__controls}>
        <Link to={`/edit-routine/${props.routine.id}`}><ThinButton className={style.card__controlEdit}><EditIcon></EditIcon>Editar</ThinButton></Link>
        <ThinButtonRed onClick={props.deleteRoutine}><DeleteIcon></DeleteIcon>Eliminar</ThinButtonRed>
      </div>
        }
    </div>
  )
}

export default RoutineCard
