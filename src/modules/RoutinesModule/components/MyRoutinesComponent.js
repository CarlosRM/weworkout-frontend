/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'
import RoutineGrid from '../../../components/RoutineGrid/RoutineGrid'
import { selectAuth, selectRoutines } from '../../../constants'
import { deleteRoutine } from '../reducers/RoutinesReducer'

import style from './MyRoutinesComponent.css'

import AddIcon from '@material-ui/icons/Add'
import { ThinButton } from '../../../components/ThinButton'
import { ThinButtonRed } from '../../../components/ThinButtonRed'
import { Link } from 'react-router-dom'

const MyRoutinesComponent = (props) => {
  const routinesState = useSelector(selectRoutines)
  const authState = useSelector(selectAuth)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [routineToDelete, setRoutineToDelete] = useState(null)

  const dispatch = useDispatch()

  function displayDeleteModal (routineId) {
    setRoutineToDelete(routineId)
    setShowDeleteModal(true)
  }

  function hideDeleteModal () {
    setRoutineToDelete(null)
    setShowDeleteModal(false)
  }

  function handleDeleteRoutine () {
    const data = {
      token: new Cookies().get('WeWorkoutToken'),
      id: routineToDelete
    }
    dispatch(deleteRoutine(data))
    hideDeleteModal()
  }

  const user = authState.user

  const myRoutines = routinesState.allRoutines.filter(el => el.user_id === authState.user.id)

  return (
    <div className={style.main}>
        <div className={style.user__heading}>
            <h1 className={style.user__title}>{user.name}</h1>
              <div className={style.user__stats}>
                <span>{user.followers.length} SEGUIDORES · </span>
                <span>{user.followees.length} SEGUIDOS · </span>
                <span>{myRoutines.length} RUTINAS</span>
              </div>
        </div>
        <div className={style.myRoutines__heading}>
          <h1>Mis rutinas</h1>
          <Link to='/add-routine'><ThinButton className={style.myRoutines__addRoutine}><AddIcon></AddIcon>Añadir rutina</ThinButton></Link>
        </div>
        {myRoutines.length > 0 && <RoutineGrid deleteRoutine={displayDeleteModal} myRoutines={true} routines={myRoutines} />}
        {myRoutines.length === 0 && <p>Todavía no has creado ninguna rutina de entrenamiento.</p>}
        {showDeleteModal && <div className={style.delete__modalWrapper}>
          <div className={style.delete__modal}>
            <p>¿Estás seguro de eliminar esta rutina? Esta acción es irreversible.</p>
            <div className={style.delete__modalControls}>
              <ThinButton className={style.delete__modalControl} onClick={handleDeleteRoutine}>Eliminar</ThinButton>
              <ThinButtonRed className={style.delete__modalControl} onClick={hideDeleteModal}>Cancelar</ThinButtonRed>
            </div>
          </div>
        </div>}
    </div>
  )
}

export default MyRoutinesComponent
