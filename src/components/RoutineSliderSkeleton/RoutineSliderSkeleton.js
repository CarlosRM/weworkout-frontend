/* eslint-disable react/prop-types */
import React from 'react'

import style from './RoutineSliderSkeleton.css'
import useWindowDimensions from '../../utils/hooks/useWindowDimensions'
import Skeleton from '@material-ui/lab/Skeleton'

const RoutineSliderSkeleton = (props) => {
  const { width } = useWindowDimensions()

  function getThreshold () {
    let threshold = 0
    if (width > 500) threshold = 1
    if (width > 800) threshold = 2
    if (width > 1200) threshold = 3
    if (width > 1500) threshold = 4
    return threshold
  }

  const arr = new Array(10).fill(undefined)

  return (
    <div className={style.main}>
        <div className={style.skeleton__heading}>
          <Skeleton className={style.skeletonTitle} variant="rect" width={'15rem'} height={'2rem'}></Skeleton>
          <Skeleton className={style.skeleton__seeAll} variant="rect" width={'8rem'} height={'2rem'}></Skeleton>
        </div>
        <div className={style.skeletonSlider}>
          {arr.map((el, index) =>
          <div key={index} style={{ width: `calc(100% / ${getThreshold() + 1}`, display: index > getThreshold() ? 'none' : 'block' }} className={style.skeletonWrapper}>
            <Skeleton className={style.skeleton} key={index} variant="rect" width={'100%'} height={'15rem'}></Skeleton>
          </div>)}
        </div>
        <Skeleton className={style.skeletonButton} variant="rect" width={'100%'} height={50}></Skeleton>
    </div>
  )
}

export default RoutineSliderSkeleton
