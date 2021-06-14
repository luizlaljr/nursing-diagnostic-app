import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { ContextProvider } from '../context/context'
import LottieComponent from '../components/lottie/index'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = () => {
      setLoading(true)
    }
    const end = () => {
      setLoading(false)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])
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
