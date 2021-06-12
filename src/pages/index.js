import React from 'react'
import Head from 'next/head'
import Button from '../components/utils/button/button'
import styles from '../styles/Home.module.scss'

import logo from '../assets/logo.svg'

export default function Home() {
  return (
    <>
      <Head>
        <title>Nursing DiagnostIC</title>
        <meta
          name="description"
          content="Aplicativo de auxílio ao diagnóstico de enfermagem cardíaca"
        />
        <link rel="icon" href="/favicon.ico?v=2" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <h3 className={styles.pretitle}>Nursing</h3>
          <h1 className={styles.title}>
            Diagnos<span>IC</span>
          </h1>
          <div className={styles.image}>
            <img src={logo} alt="heart with pulse" />
          </div>
          <p className={styles.subtitle}>
            DIAGNÓSTICOS DE ENFERMAGENS EM INSUFICIÊNCIA CARDÍACA
          </p>
          <Button click={null} path="domain/1" background="#FFF" color="#C1090">
            Começar
          </Button>
        </main>
      </div>
    </>
  )
}
