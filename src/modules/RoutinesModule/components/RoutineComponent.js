/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth, selectCategories, selectRoutines, selectUsers } from '../../../constants'
import { VanillaButton } from '../../../components/VanillaButton'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import VisibilityIcon from '@material-ui/icons/Visibility'
import ChatIcon from '@material-ui/icons/Chat'
import StarIcon from '@material-ui/icons/Star'

import style from './RoutineComponent.css'
import { Avatar, Box, Card, CardContent, TextField, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { addFavorite, removeFavorite } from '../../AuthModule/reducers/AuthReducer'

import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import { ThinButton } from '../../../components/ThinButton'

import AddIcon from '@material-ui/icons/Add'
import { addComment, addRating } from '../reducers/RoutinesReducer'
import Rating from '@material-ui/lab/Rating'

const RoutineComponent = (props) => {
  const authState = useSelector(selectAuth)
  const routinesState = useSelector(selectRoutines)
  const categoriesState = useSelector(selectCategories)
  const usersState = useSelector(selectUsers)

  const [rating, setRating] = useState(3)
  const [showRating, setShowRating] = useState(false)

  const [newComment, setNewComment] = useState('')
  const [showCommentBox, setShowCommentBox] = useState(false)

  const routine = routinesState.allRoutines.find(el => el.id === parseInt(props.match.params.id))

  const dispatch = useDispatch()

  function handleAddFavorite () {
    const data = {
      token: new Cookies().get('WeWorkoutToken'),
      userId: authState.user.id,
      routineId: routine.id
    }
    dispatch(addFavorite(data))
  }

  function handleRemoveFavorite () {
    const data = {
      token: new Cookies().get('WeWorkoutToken'),
      userId: authState.user.id,
      routineId: routine.id
    }
    dispatch(removeFavorite(data))
  }

  function handleRate () {
    const data = {
      token: new Cookies().get('WeWorkoutToken'),
      id: routine.id,
      body: {
        rating: rating
      }
    }
    dispatch(addRating(data))
    setShowRating(false)
  }

  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: 'white'
    },
    section: {
      margin: 10,
      padding: 10
    },
    h1: {
      fontSize: 28,
      fontWeight: 'bold'
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold'

    },
    card: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      border: '1px solid grey',
      alignContent: 'center',
      marginTop: 16,
      fontSize: 12
    },
    p: {
      marginTop: 16,
      fontSize: 12
    }
  })

  // Create Document Component
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.h1}>Creada por {routine.name}</Text>
          <Text style={styles.p}>{usersState.allUsers.find(user => user.id === routine.user_id).name}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.h2}>Descripción</Text>
          <Text style={styles.p}>{routine.description}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.h2}>Ejercicios</Text>
          {routine.sets.map((el, idx) =>
            <View key={el.id} style={styles.card}>
              <Text>{el.exercise.name}</Text>
              <Text>Repeticiones: {el.repetitions}</Text>
            </View>
          )}
        </View>
        </Page>
    </Document>
  )

  const handleInputChange = (e) => {
    setNewComment(e.target.value)
  }

  const handlePublishComment = () => {
    const data = {
      token: new Cookies().get('WeWorkoutToken'),
      id: routine.id,
      body: {
        user_id: authState.user.id,
        routine_id: routine.id,
        content: newComment
      }
    }
    dispatch(addComment(data))
    setShowCommentBox(false)
  }

  function sortByDate (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.updated_at) - new Date(a.updated_at);
  }

  return (
    <div className={style.main}>
      <div className={`${style.column} ${style.firstColumn}`}>
        <div className={style.routine__heading}>
          <h1 className={style.routine__title}>{routine.name}</h1>
            <Link to={`/users/${routine.user_id}`}>
              <div className={style.routine__headingAuthor}>
                <Avatar>
                  {usersState.allUsers.find(user => user.id === routine.user_id).name.slice(0, 1).toUpperCase()}
                </Avatar>
                <span className={style.routine__commentAuthorName}>{usersState.allUsers.find(user => user.id === routine.user_id).name}</span>
              </div>
            </Link>
            <div className={style.routine__headingCategories}>
              {routine.bodyparts.map((el, idx) =>
                <span key={el}>{idx !== 0 ? ` · ${el}` : el}</span>
              )}

              {routine.categories.map((el, idx) =>
                <span key={el}>{` · ${categoriesState.allCategories.find(cat => cat.id === el).name}`}</span>
              )}
            </div>
            <div className={style.routine__stats}>
              <div className={`${style.routine__rating} ${style.routine__stat}`}>
                <StarIcon></StarIcon>
                <span>{Math.round(routine.rating * 10) / 10}</span>
              </div>
              <div className={`${style.routine__comments} ${style.routine__stat}`}>
                <ChatIcon></ChatIcon>
                <span>{routine.comments.length}</span>
              </div>
              <div className={`${style.routine__views} ${style.routine__stat}`}>
                <VisibilityIcon></VisibilityIcon>
                <span>{routine.visualizations}</span>
              </div>
            </div>
            <div className={style.routine__controls}>
                <VanillaButton className={style.routine__control}>
                  <PDFDownloadLink document={<MyDocument />} fileName={`${routine.name}.pdf`}>
                    {({ blob, url, loading, error }) =>
                      loading ? 'Descargar en PDF' : 'Descargar en PDF'
                    }
                  </PDFDownloadLink>
                </VanillaButton>
                {!authState.user.favourite_routines.includes(routine.id) && <VanillaButton onClick={handleAddFavorite} className={style.routine__control}><FavoriteBorderIcon></FavoriteBorderIcon></VanillaButton>}
                {authState.user.favourite_routines.includes(routine.id) && <VanillaButton onClick={handleRemoveFavorite} className={style.routine__control}><FavoriteIcon></FavoriteIcon></VanillaButton>}
                <VanillaButton onClick={() => setShowRating(true)} className={style.routine__control}><StarBorderIcon></StarBorderIcon></VanillaButton>
            </div>
          </div>
          <div className={style.routine__notes}>
            <h2>Notas</h2>
            <p>{routine.description}</p>
          </div>
      </div>
      <div className={`${style.column} ${style.secondColumn}`}>
        <h2>Ejercicios</h2>
        <div className={style.routine__exercises}>
          {routine.sets.map((el, idx) =>
          <Link key={idx} to={`/exercise/${el.exercise.id}`}>
            <Card className={style.routine__exerciseCard} >
              <CardContent>
                <div className={style.routine__exercise}>
                  <span>{el.exercise.name}</span>
                  <span>Repeticiones: {el.repetitions} </span>
                </div>
              </CardContent>
            </Card>
          </Link>
          )}
        </div>
        <div className={style.routine__commentsHeading}>
          <h2>Comentarios</h2>
          {!showCommentBox && <ThinButton className={style.routine__addComment} onClick={() => setShowCommentBox(true)}><AddIcon></AddIcon>Añadir comentario</ThinButton>}
        </div>
        {showCommentBox && <div className={style.routine__addCommentBox}>
              <TextField
                variant='outlined'
                label='Nuevo comentario'
                name='comentario'
                type='textarea'
                multiline
                rows={4}
                rowsMax={4}
                value={newComment}
                onChange={e => handleInputChange(e)}
              />
            <ThinButton className={style.routine__publishNewComment} onClick={handlePublishComment}>Publicar</ThinButton>
        </div>}
        <div className={style.routine__comments}>
          {routine.comments.length === 0 && <p>Aún no hay comentarios.</p>}
          {routine.comments.length > 0 && [...routine.comments].sort(sortByDate).map((el, idx) =>
            <Card className={style.routine__commentCard} key={idx}>
              <CardContent>
                <div className={style.routine__comment}>
                  <div className={style.routine__commentAuthor}>
                  <Link to={`/users/${el.user_id}`}>
                  <Avatar>
                    {usersState.allUsers.find(user => user.id === el.user_id).name.slice(0, 1).toUpperCase()}
                  </Avatar>
                  </Link>
                  <Link to={`/users/${el.user_id}`}>
                    <span className={style.routine__commentAuthorName}>{usersState.allUsers.find(user => user.id === el.user_id).name}</span>
                  </Link>
                  <span className={style.routine__commentDate}>{el.created_at.slice(0, 10)}</span>
                  </div>
                  <p className={style.routine__commentContent}>{el.content}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <div className={`${style.column} ${style.thirdColumn}`}>
      <h2>Similares</h2>
          {routinesState.allRoutines.filter(el => routine.similar.includes(el.id)).map((ex, idx) =>
          <Link key={idx} to={`/routine/${ex.id}`} className={style.similar}>
            <Card>
              <CardContent>
                <h3>{ex.name}</h3>
              </CardContent>
            </Card>
          </Link>
          )}
      </div>

      {showRating && <div className={style.routine__ratingWrapper}>
          <div className={style.routine__ratingModal}>
            <h3>Puntuación</h3>
            <Rating
              size='large'
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue)
              }}
            />
            <ThinButton onClick={handleRate} className={style.routine__ratingButton}>Puntuar</ThinButton>
          </div>
      </div>}
    </div>
  )
}

export default RoutineComponent
