import React from 'react'
import style from './FrontPageFeatures.css'
import { Link } from 'react-router-dom'
import { VanillaButton } from '../../../../components/VanillaButton'

const FrontPageFeatures = () => {
  return (
    <div className={style.features}>
      <h2 className={style.features__title}>
        Comparte tus rutinas de entrenamiento con el mundo
      </h2>
      <div className={style.features__container}>
        <div className={style.features__feature}>
          <h3>Crea tu propia rutina y compártela con todos</h3>
          <p>Muestra tu rutina de entrenamiento al mundo. El resto de usuarios podrán valorarla y dejar sus comentarios. Ayuda a otros con los planes de entrenamiento que te han funcionado a ti.</p>
        </div>
        <div className={style.features__feature}>
          <h3>Aprende de otros</h3>
          <p>¿No sabes por dónde empezar? ¿Te apetece un cambio en tus entrenamientos? Encuentra la rutina que se adapte mejor a tus necesidades.</p>
        </div>
        <div className={style.features__feature}>
          <h3>Sigue a tus entrenadores favoritos</h3>
          <p>¿Una rutina te ha encantado? Sigue a su autor para no perderte nada de su nuevo contenido.</p>
        </div>
        <div className={style.features__feature}>
          <h3>Sin pagar nada</h3>
          <p>Acceso completo, gratuito, para siempre. Nuestro objetivo es expandir la cultura fitness y hacer del mundo un lugar más saludable.</p>
        </div>
      </div>
    </div>
  )
}

export default FrontPageFeatures
