import React from 'react'

import style from './FooterComponent.css'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'

const FooterComponent = () => {
  return (
    <div className={style.footer}>
      <div className={style.footer__links}>
        <a href='https://github.com/CarlosRM/' target='_blank' rel='noreferrer'><GitHubIcon className={style.footer__icon}></GitHubIcon></a>
        <a href='https://www.linkedin.com/in/carlos-rold%C3%A1n-montaner/' target='_blank' rel='noreferrer'><LinkedInIcon className={style.footer__icon}></LinkedInIcon></a>
      </div>
      <p>Trabajo de final del máster. Master en diseño y desarrollo de aplicaciones web. Carlos Roldán Montaner. UOC. 2021.</p>
    </div>
  )
}

export default FooterComponent
