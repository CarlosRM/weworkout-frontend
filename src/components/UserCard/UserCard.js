/* eslint-disable react/prop-types */
import React from 'react'

import style from './UserCard.css'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core'

const UserCard = (props) => {
  return (
    <div className={`${style.card__wrapper} ${props.hide ? style.card__hide : style.card__show}`}>
      <Link to={`/users/${props.user.id}`}>
        <Card>
          <CardContent>
            <div className={style.card__user}>
              <Avatar>
              {props.user.name.slice(0, 1).toUpperCase()}
              </Avatar>
              <h3>{props.user.name}</h3>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}

export default UserCard
