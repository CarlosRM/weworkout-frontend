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

import style from './FolloweesComponent.css'
import { Avatar, Card, CardContent } from '@material-ui/core'
import UserGrid from '../../../components/UserGrid/UserGrid'

const FolloweesComponent = (props) => {
  const routinesState = useSelector(selectRoutines)
  const categoriesState = useSelector(selectCategories)
  const usersState = useSelector(selectUsers)
  const authState = useSelector(selectAuth)

  const user = authState.user

  function getFollowees () {
    return usersState.allUsers.filter(el => user.followees.includes(el.id))
  }

  const followees = getFollowees()

  return (
    <div className={style.main}>
        <h1 >Seguidos de {user.name}</h1>
        {followees.length > 0 &&
          <div>
          <UserGrid users={getFollowees()}></UserGrid>
          </div>
        }

        {followees.length === 0 &&
          <p>Todavía no sigues a nadie.</p>
        }
    </div>
  )
}

export default FolloweesComponent
