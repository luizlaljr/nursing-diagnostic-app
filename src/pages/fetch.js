import React, { useState } from 'react'
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
  const [show, setShow] = useState(false)

  const handleDisplay = () => {
    setShow(!show)
  }

  const handlePath = (id) => {
    return `/diagnosis/${id}`
  }

  return (
    <>
      <Head>
        <title>Resultado | ND</title>
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
            <h5 className={styles.title}>Diagnósticos de Enfermagem</h5>
          </div>
          <ul className={styles.list}>
            {props.diagnostics.map((diagnosis) => (
              <li key={diagnosis.id} className={styles.listitem}>
                <Link href={handlePath(diagnosis.id)}>
                  <a>
                    {diagnosis.name} <i className="fas fa-search"></i>
                  </a>
                </Link>
                <div
                  className={styles.symptoms}
                  style={{ display: show ? 'block' : 'none' }}
                >
                  {diagnosis.related.map((symptom) => (
                    <div key={symptom.name} className={styles.symptom}>
                      - {symptom.name}
                    </div>
                  ))}
                </div>
                <div onClick={handleDisplay}>
                  {show ? (
                    <i className="fas fa-angle-up"></i>
                  ) : (
                    <i className="fas fa-angle-down"></i>
                  )}
                </div>
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
