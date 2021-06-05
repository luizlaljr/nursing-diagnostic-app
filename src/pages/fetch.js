import React from 'react'
import Head from 'next/head'
import Header from '../components/header/index'
import Footer from '../components/footer/index'
import Link from 'next/link'
import api from '../services/api/api'

import styles from '../styles/Fetch.module.scss'

export async function getServerSideProps(context) {
  const ids = context.query.id

  const { data: diagnostics } = await api.get(`fetch?id=${ids}`)

  return {
    props: {
      diagnostics: diagnostics,
    },
  }
}

function Fetch(props) {
  const handlePath = (id) => {
    return `/diagnosis/${id}`
  }

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
      <Header />
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h5 className={styles.title}>Possíveis Diagnósticos</h5>
          </div>
          <ul className={styles.list}>
            {props.diagnostics.map((diagnosis) => (
              <li key={diagnosis.id} className={styles.listitem}>
                <Link href={handlePath(diagnosis.id)}>{diagnosis.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Fetch
