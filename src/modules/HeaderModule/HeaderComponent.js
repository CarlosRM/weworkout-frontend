import React from 'react'
import useWindowDimensions from '../../utils/hooks/useWindowDimensions'
import HeaderDesktopComponent from './HeaderDesktop'
import HeaderMobileComponent from './HeaderMobile'

const HeaderComponent = () => {
  const { width } = useWindowDimensions()

  return width > 800 ? <HeaderDesktopComponent /> : <HeaderMobileComponent />
}

export default HeaderComponent
