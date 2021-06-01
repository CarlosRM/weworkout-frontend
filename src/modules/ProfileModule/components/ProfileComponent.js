/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAuth, selectExercises, selectWorkouts } from '../../../constants'
import { VanillaButton } from '../../../components/VanillaButton'

import style from './ProfileComponent.css'
import { Link } from 'react-router-dom'
import { Line, Pie } from 'react-chartjs-2'

const ProfileComponent = (props) => {
  const authState = useSelector(selectAuth)
  const workoutState = useSelector(selectWorkouts)
  const exerciseState = useSelector(selectExercises)

  const user = authState.user

  function calculateAge () {
    const now = Date.now()
    const birthday = new Date(user.birthdate)
    const dif = new Date(now - birthday)
    return Math.abs(dif.getUTCFullYear() - 1970)
  }

  function calculateBodypartVolume () {
    const bodyparts = {
      Pierna: 0,
      Brazo: 0,
      Torso: 0,
      Espalda: 0
    }

    const workouts = workoutState.allMyWorkouts
    workouts.forEach(workout => {
      const sets = workout.sets
      sets.forEach(set => {
        const exerciseId = set.exercise_id
        const exercise = exerciseState.allExercises.find(el => el.id === exerciseId)
        const muscles = exercise.muscles
        muscles.forEach(muscle => {
          bodyparts[muscle.bodypart] += 1
        })
      })
    })

    return Object.values(bodyparts)
  }

  function calculateWeightOverTime () {
    const workouts = workoutState.allMyWorkouts
    return workouts.map(el => el.weight)
  }

  function calculateWeightOverTimeLabels () {
    const workouts = workoutState.allMyWorkouts
    return workouts.map(el => el.date.slice(0, 10))
  }

  function calculateBodyfatOverTime () {
    const workouts = workoutState.allMyWorkouts
    return workouts.map(el => el.fat_percentage)
  }

  function calculateBodyfatOverTimeLabels () {
    const workouts = workoutState.allMyWorkouts
    return workouts.map(el => el.date.slice(0, 10))
  }

  const trainingVolumeData = {
    labels: ['Pierna', 'Brazo', 'Torso', 'Espalda'],
    datasets: [
      {
        data: calculateBodypartVolume(),
        label: 'Volumen de entrenamiento',
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  const weightOverTimeData = {
    labels: calculateWeightOverTimeLabels(),
    datasets: [
      {
        data: calculateWeightOverTime(),
        label: 'Peso / Tiempo',
        backgroundColor: 'rgba(3, 169, 244, 0.5)',
        borderColor: 'rgb(3, 169, 244)',
        fill: false
      }
    ]
  }

  const bodyfatOverTimeData = {
    labels: calculateBodyfatOverTimeLabels(),
    datasets: [
      {
        data: calculateBodyfatOverTime(),
        label: '% Grasa / Tiempo',
        backgroundColor: 'rgba(3, 169, 244, 0.5)',
        borderColor: 'rgb(3, 169, 244)',
        fill: false
      }
    ]
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
        <h1>Estadísticas</h1>
        {workoutState.allMyWorkouts.length > 0 && <div className={style.graphs}>
        <Pie className={style.pieChart} data={trainingVolumeData}></Pie>
        <Line className={style.lineChart}
          data={weightOverTimeData}
          options={{
            scales: {
              xAxes:
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 15,
                    maxRotation: 90,
                    minRotation: 90
                  }
                }
            },
            bezierCurve: true,
            pointRadius: 0,
            lineTension: 0.2
          }}></Line>
        <Line className={style.lineChart}
          data={bodyfatOverTimeData}
          options={{
            scales: {
              xAxes: {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  maxRotation: 90,
                  minRotation: 90
                }
              }
            },
            bezierCurve: true,
            pointRadius: 0,
            lineTension: 0.2
          }}></Line>
        </div>}
        {workoutState.allMyWorkouts.length === 0 && <p>Aún no has hecho ninguna sesión y no tenemos estadísticas. ¡Empieza ya a hacer ejercicio y añade un nuevo registro!</p>}
      </div>
      <div className={`${style.column} ${style.thirdColumn}`}>
        <Link className={style.profile__link} to={'/my-workouts'}><VanillaButton className={style.profile__link}>Registros de ejercicio</VanillaButton></Link>
        <Link className={style.profile__link} to={'/workout-progression'}><VanillaButton className={style.profile__link}>Gráficos de progreso</VanillaButton></Link>
        <Link className={style.profile__link} to={'/my-routines'}><VanillaButton className={style.profile__link}>Mis rutinas</VanillaButton></Link>
        <Link className={style.profile__link} to={`/users/${user.id}/followers`}><VanillaButton className={style.profile__button}>Seguidores</VanillaButton></Link>
        <Link className={style.profile__link} to={`/users/${user.id}/followees`}><VanillaButton className={style.profile__button}>Seguidos</VanillaButton></Link>
      </div>
    </div>
  )
}

export default ProfileComponent
