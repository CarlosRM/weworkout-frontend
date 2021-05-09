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

import style from './FollowersComponent.css'
import { Avatar, Card, CardContent } from '@material-ui/core'
import UserGrid from '../../../components/UserGrid/UserGrid'

const FollowersComponent = (props) => {
  const routinesState = useSelector(selectRoutines)
  const categoriesState = useSelector(selectCategories)
  const usersState = useSelector(selectUsers)
  const authState = useSelector(selectAuth)

  const user = authState.user

  function getFollowers () {
    return usersState.allUsers.filter(el => user.followers.includes(el.id))
  }

  const followers = getFollowers()

  return (
    <div className={style.main}>
        <h1 >Seguidores de {user.name}</h1>
        {followers.length > 0 &&
        <div>
          <UserGrid users={followers}></UserGrid>
        </div>}
        {followers.length === 0 &&
          <p>Todavía no tienes seguidores</p>
        }
    </div>
  )
}

export default FollowersComponent
