/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAuth, selectUsers } from '../../../constants'

import style from './FollowersComponent.css'
import UserGrid from '../../../components/UserGrid/UserGrid'

const FollowersComponent = (props) => {
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
