/* eslint-disable react/prop-types */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth, selectRoutines, selectUsers } from '../../../constants'
import RoutineGrid from '../../../components/RoutineGrid/RoutineGrid'

import style from './UserComponent.css'
import { ThinButton } from '../../../components/ThinButton'
import { follow, unfollow } from '../../AuthModule/reducers/AuthReducer'
import Cookies from 'universal-cookie'

const UserComponent = (props) => {
  const routinesState = useSelector(selectRoutines)
  const usersState = useSelector(selectUsers)
  const authState = useSelector(selectAuth)

  const user = usersState.allUsers.find(el => el.id === parseInt(props.match.params.id))

  const dispatch = useDispatch()

  const handleFollow = () => {
    const data = {
      token: new Cookies().get('WeWorkoutToken'),
      id: authState.user.id,
      followeeId: user.id
    }
    dispatch(follow(data))
  }

  const handleUnfollow = () => {
    const data = {
      token: new Cookies().get('WeWorkoutToken'),
      id: authState.user.id,
      followeeId: user.id
    }
    dispatch(unfollow(data))
  }

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
                {authState.user.followees.includes(user.id) && <ThinButton onClick={handleUnfollow} className={style.user__control}>DEJAR DE SEGUIR</ThinButton>}
                {!authState.user.followees.includes(user.id) && <ThinButton onClick={handleFollow} className={style.user__control}>SEGUIR</ThinButton>}
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
