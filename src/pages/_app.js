import React from 'react'
import { ContextProvider } from '../context/context'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
}

export default MyApp
