/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAuth, selectUsers } from '../../../constants'

import style from './FolloweesComponent.css'
import UserGrid from '../../../components/UserGrid/UserGrid'

const FolloweesComponent = (props) => {
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
