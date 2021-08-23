import React, { useState } from 'react'
import Router from 'next/router'
import { ContextProvider } from '../context/context'
import LottieComponent from '../components/lottie/index'
import '../styles/globals.scss'

import * as ga from '../lib/ga'

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)

  const start = () => {
    setLoading(true)
  }
  const end = () => {
    setLoading(false)
  }
  Router.events.on('routeChangeStart', start)
  Router.events.on('routeChangeComplete', end)
  Router.events.on('routeChangeError', end)

  const handleRouteChange = (url) => {
    ga.pageview(url)
  }
  // When the component is mounted, subscribe to router changes
  // and log those page views
  Router.events.on('routeChangeComplete', handleRouteChange)

  return (
    <ContextProvider>
      {loading ? (
        <>
          <LottieComponent />
        </>
      ) : (
        <Component {...pageProps} />
      )}
    </ContextProvider>
  )
}

export default MyApp
