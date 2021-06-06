import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAuth, selectCategories, selectExercises, selectRoutines, selectUsers } from '../../../constants'

import style from './SearchComponent.css'
import RoutineGrid from '../../../components/RoutineGrid/RoutineGrid'
import { TextField } from '@material-ui/core'
import ExerciseGrid from '../../../components/ExerciseGrid/ExerciseGrid'
import UserGrid from '../../../components/UserGrid/UserGrid'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { VanillaButton } from '../../../components/VanillaButton'

import CancelIcon from '@material-ui/icons/Cancel'

const SearchComponent = () => {
  const routinesState = useSelector(selectRoutines)
  const exercisesState = useSelector(selectExercises)
  const categoriesState = useSelector(selectCategories)
  const usersState = useSelector(selectUsers)
  const authState = useSelector(selectAuth)

  const [routinesResults, setRoutinesResults] = useState([])
  const [exercisesResults, setExercisesResults] = useState([])
  const [usersResults, setUsersResults] = useState([])
  const [searchText, setSearchText] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [categoryFilters, setCategoryFilters] = useState([])
  const [bodypartsFilters, setBodypartsFilters] = useState([])

  const [showRoutines, setShowRoutines] = useState(true)
  const [showExercises, setShowExercises] = useState(true)
  const [showUsers, setShowUsers] = useState(true)

  const bodyparts = ['Brazo', 'Pierna', 'Torso', 'Espalda']

  function displayFilters () {
    setShowFilters(true)
  }

  function hideFilters () {
    setShowFilters(false)
  }

  function isDataReady () {
    return routinesState.getAllRoutines.success &&
           authState.user !== null
  }

  function handleInputChange (e) {
    setSearchText(e.target.value)
  }

  function toggleCategoryFilter (id) {
    const newFilters = [...categoryFilters]
    const index = newFilters.findIndex(el => el === id)
    if (index === -1) newFilters.push(id)
    else newFilters.splice(index, 1)
    setCategoryFilters(newFilters)
  }

  function toggleBodypartFilter (bodypart) {
    const newFilters = [...bodypartsFilters]
    const index = newFilters.findIndex(el => el === bodypart)
    if (index === -1) newFilters.push(bodypart)
    else newFilters.splice(index, 1)
    setBodypartsFilters(newFilters)
  }

  function search (text) {
    if (text === '') {
      setRoutinesResults([])
      setExercisesResults([])
      setUsersResults([])
    } else {
      let routines = routinesState.allRoutines.filter(el => el.name.toLowerCase().includes(text.toLowerCase()))
      // Filter by category
      routines = routines.filter(element => {
        return categoryFilters.reduce((accumulator, currentValue) => {
          return accumulator && element.categories.includes(currentValue)
        }, true)
      })

      routines = routines.filter(element => {
        return bodypartsFilters.reduce((accumulator, currentValue) => {
          return accumulator && element.bodyparts.includes(currentValue)
        }, true)
      })

      const exercises = exercisesState.allExercises.filter(el => el.name.toLowerCase().includes(text.toLowerCase()))
      const users = usersState.allUsers.filter(el => el.name.toLowerCase().includes(text.toLowerCase()))

      setRoutinesResults(routines)
      setExercisesResults(exercises)
      setUsersResults(users)
    }
  }

  useEffect(() => {
    search(searchText)
  }, [searchText, categoryFilters, bodypartsFilters])

  return (
    <div className={style.main}>
      <h1>Buscar</h1>
      <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <TextField
          variant="outlined"
          label={'Buscar por nombre'}
          name='username'
          type='text'
          value={searchText}
          autoComplete='off'
          onChange={e => handleInputChange(e)}
        >
        </TextField>
      </form>
        {isDataReady &&
          <div className={style.container}>
            <div className={style.routines}>
              <div className={style.heading}>
                <h2 onClick={() => setShowRoutines(!showRoutines)}>Rutinas</h2>
                <ExpandMoreIcon onClick={() => setShowRoutines(!showRoutines)} className={!showRoutines ? style.rotateLeft : ''} />
                <button className={style.displayFilters} onClick={displayFilters}>Filtros</button>
              </div>
              <div className={style.filters}>
                {categoriesState.allCategories.filter(el => categoryFilters.includes(el.id)).map((cat, idx) =>
                  <button className={style.appliedFilter} onClick={() => toggleCategoryFilter(cat.id)} key={cat.id}>{cat.name} <CancelIcon style={{ marginLeft: '0.25rem' }}fontSize='small'/></button>
                )}
                {bodypartsFilters.map((bodypart, idx) =>
                  <button className={style.appliedFilter} onClick={() => toggleBodypartFilter(bodypart)} key={bodypart}>{bodypart} <CancelIcon style={{ marginLeft: '0.25rem' }}fontSize='small'/></button>
                )}
              </div>
              {showRoutines && <div className={style.routines__content}>
                {routinesResults.length === 0
                  ? <p>Sin resultados</p>
                  : <RoutineGrid routines={routinesResults}/>
                }
              </div>}
            </div>
            <div className={style.exercises}>
              <div className={style.heading} onClick={() => setShowExercises(!showExercises)}>
                <h2>Ejercicios</h2>
                <ExpandMoreIcon className={!showExercises ? style.rotateLeft : ''} />
              </div>
              {showExercises && <div className={style.exercises__content}>
                {exercisesResults.length === 0
                  ? <p>Sin resultados</p>
                  : <ExerciseGrid exercises={exercisesResults}/>
                }
              </div>}
            </div>
            <div className={style.users}>
              <div className={style.heading} onClick={() => setShowUsers(!showUsers)}>
                <h2>Usuarios</h2>
                <ExpandMoreIcon className={!showUsers ? style.rotateLeft : ''} />
              </div>
              {showUsers && <div className={style.users__content}>
                {usersResults.length === 0
                  ? <p>Sin resultados</p>
                  : <UserGrid users={usersResults}/>
                }
              </div>}
            </div>
          </div>
        }

        {showFilters &&
        <div className={style.filterOverlay__wrapper}>
          <div className={style.filterOverlay}>
            <h2>Filtros</h2>
            <h3>Categorías</h3>
            <div className={style.filter__list}>{categoriesState.allCategories.map((el, idx) =>
              <button className={`${style.filterButton} ${categoryFilters.includes(el.id) ? style.selected : style.unselected}`} onClick={() => toggleCategoryFilter(el.id)} key={el.id}>{el.name}</button>
            )}</div>
            <h3>Partes del cuerpo</h3>
            <div className={style.filter__list}>
            {bodyparts.map((el, idx) =>
              <button className={`${style.filterButton} ${bodypartsFilters.includes(el) ? style.selected : style.unselected}`} onClick={() => toggleBodypartFilter(el)} key={el}>{el}</button>
            )}
            </div>
            <VanillaButton onClick={hideFilters} className={style.filter__accept} variant="contained" color="primary">Aceptar</VanillaButton>
          </div>
        </div>

        }
    </div>
  )
}

export default SearchComponent
