/* eslint-disable react/prop-types */
import React from 'react'
import UserCard from '../UserCard/UserCard'

import style from './UserGrid.css'

const UserGrid = (props) => {
  return (
    <div className={style.main}>
        {props.title !== undefined && <div className={style.userSlider__heading}>
          <h1>{props.title}</h1>
        </div>}
        <div className={style.userSlider}>
          {props.users.map((user, index) =>
            <UserCard key={user.id} user={user} hide={false} />
          )}
        </div>
    </div>
  )
}

export default UserGrid
