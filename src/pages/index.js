import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Button from '../components/utils/button/button'
import styles from '../styles/Home.module.scss'

import logo from '../assets/logo.svg'
import Lottie from '../components/lottie'

export default function Home() {
  const [splashScreen, setSplashScreen] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setSplashScreen(false)
    }, 3700)
  }, [])

  return (
    <>
      <Head>
        <title>Nursing DiagnosIC</title>
        <meta
          name="description"
          content="Aplicativo de auxílio ao diagnóstico de enfermagem cardíaca"
        />
        <link rel="icon" href="/favicon.ico?v=2" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          {splashScreen ? (
            <>
              <h3 className={styles.pretitle}>Nursing</h3>
              <h1 className={styles.title}>
                Diagnos<span>IC</span>
              </h1>
              <Lottie />
              <p className={styles.subtitle}>
                DIAGNÓSTICOS DE ENFERMAGENS EM INSUFICIÊNCIA CARDÍACA
              </p>
            </>
          ) : (
            <>
              <h6 className={styles.pretitle}>Nursing</h6>
              <h3 className={styles.title}>
                Diagnos<span>IC</span>
              </h3>
              <div className={styles.image_min}>
                <img src={logo} alt="heart with pulse" />
              </div>
              <h6 className={styles.pretitle}>Bem vindo</h6>
              <p className={styles.text}>
                Toque no botão abaixo para iniciar o processo de tomada de decisão
                para diagnósticos de enfermagem de pacientes com insuficiência
                cardíaca
              </p>
              <Button
                click={null}
                path="/begin"
                background="#FFF"
                color="#C1090"
                borderColor="#CC191D"
              >
                Login
              </Button>
            </>
          )}
        </main>
      </div>
    </>
  )
}
