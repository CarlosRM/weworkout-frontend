import React from 'react'
import style from './FrontPageGraphs.css'
import Fade from 'react-reveal/Fade'

const FrontPageGraphs = () => {
  return (
    <div className={style.graphs}>
      <Fade left>
      <div className={`${style.graphs__column} ${style.graphs__imageHolder}`}>
          <img src='/src/assets/images/graphs.jpg'></img>
      </div>
      </Fade>
      <div className={`${style.graphs__column} ${style.graphs__content}`}>
        <Fade bottom>
          <h2>Controla tu progreso</h2>
          <p>Añade registros personales de tus sesiones para controlar tu progreso. Descubre que partes de tu cuerpo estás entrenando de más. Observa tu mejora con nuestros gráficos que muestran tu progreso por ejercicio a lo largo del tiempo.</p>
        </Fade>
      </div>
    </div>
  )
}

export default FrontPageGraphs
