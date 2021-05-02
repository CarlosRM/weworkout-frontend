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
import RoutineGrid from  '../../../components/RoutineGrid/RoutineGrid'

import style from './UserComponent.css'
import { Avatar, Card, CardContent } from '@material-ui/core'

const UserComponent = (props) => {
  const routinesState = useSelector(selectRoutines)
  const categoriesState = useSelector(selectCategories)
  const usersState = useSelector(selectUsers)

  const user = usersState.allUsers.find(el => el.id === parseInt(props.match.params.id))

  return (
    <div className={style.main}>
      <div className={`${style.column} ${style.firstColumn}`}>
        <div className={style.user__heading}>
          <h1 className={style.user__title}>{user.name}</h1>
            <div className={style.user__stats}>
              <span>{user.followers.length} SEGUIDORES · </span>
              <span>{user.followees.length} SEGUIDOS · </span>
              <span>{user.routines.length} RUTINAS</span>
            </div>
            <div className={style.user__controls}>
                <VanillaButton className={style.user__control}>Seguir</VanillaButton>
            </div>
          </div>
          <div className={style.user__notes}>
            <h2>¿Quién soy?</h2>
            <p>{user.description}</p>
          </div>
      </div>
      <div className={`${style.column} ${style.secondColumn}`}>
        <RoutineGrid title='Rutinas' routines={routinesState.allRoutines.filter(el => user.routines.includes(el.id))}></RoutineGrid>
      </div>
    </div>
  )
}

export default UserComponent
