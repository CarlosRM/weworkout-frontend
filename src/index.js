import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import style from './index.css'

const App = () => {
  const [apiStatus, setApiStatus] = useState('La API aún no ha cargado')

  async function fetchAPI () {
    const response = await fetch('http://127.0.0.1:8000/api/apitest')
      .then(response => response.json())
    console.log(response.data)
    setApiStatus(response.data)
  }

  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    fetchAPI()
  }, [])

  return (
    <div className={style.main}>
        <h1>{apiStatus}</h1>
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
