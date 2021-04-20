/* eslint-disable react/prop-types */
import React from 'react'
import style from './ToolTipMessage.css'

function ToolTipMessage (props) {
  const icon = props.check ? style.check : ''
  return (
    <div className={style.toolTipMessage}>
      <span className={`${icon} ${style.symbol}`}>{props.check ? '✓' : '✗'}</span>
      <span>{props.message}</span>
      <br />
    </div>
  )
}

export default ToolTipMessage
