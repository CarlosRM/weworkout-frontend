/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAuth, selectCategories, selectRoutines, selectUsers } from '../../../constants'
import { VanillaButton } from '../../../components/VanillaButton'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import VisibilityIcon from '@material-ui/icons/Visibility'
import ChatIcon from '@material-ui/icons/Chat'
import StarIcon from '@material-ui/icons/Star'
import RoutineGrid from  '../../../components/RoutineGrid/RoutineGrid'

import style from './ProfileComponent.css'
import { Avatar, Card, CardContent } from '@material-ui/core'
import { Link } from 'react-router-dom'

const ProfileComponent = (props) => {
  const authState = useSelector(selectAuth)
  const routinesState = useSelector(selectRoutines)
  const categoriesState = useSelector(selectCategories)
  const usersState = useSelector(selectUsers)

  const user = authState.user

  function calculateAge () {
    const now = Date.now()
    const birthday = new Date(user.birthdate)
    const dif = new Date(now - birthday)
    return Math.abs(dif.getUTCFullYear() - 1970)
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
            <div>
              <p><span>{`${calculateAge()} años`}</span><span>{' · ' + user.genre}</span></p>
              <p>{user.email}</p>
            </div>
          </div>
          <div className={style.user__notes}>
            <h2>¿Quién soy?</h2>
            <p>{user.description}</p>
          </div>
          <Link className={style.profile__edit} to={'/profile/edit'}><VanillaButton>Editar datos</VanillaButton></Link>
      </div>
      <div className={`${style.column} ${style.secondColumn}`}>
      </div>
      <div className={`${style.column} ${style.thirdColumn}`}>
      <VanillaButton className={style.profile__link} disabled={true}>Registro de ejercicio</VanillaButton>
      <VanillaButton className={style.profile__link} disabled={true}>Gráficos de progreso</VanillaButton>
      <Link className={style.profile__link} to={'/my-routines'}><VanillaButton className={style.profile__link}>Mis rutinas</VanillaButton></Link>
      <Link className={style.profile__link} to={`/users/${user.id}/followers`}><VanillaButton className={style.profile__button}>Seguidores</VanillaButton></Link>
      <Link className={style.profile__link} to={`/users/${user.id}/followees`}><VanillaButton className={style.profile__button}>Seguidos</VanillaButton></Link>
      </div>
    </div>
  )
}

export default ProfileComponent
