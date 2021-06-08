import React from 'react'
import Head from 'next/head'
import Header from '../../components/header/index'
import { useRouter } from 'next/router'
import Footer from '../../components/footer/index'
import styles from '../../styles/Diagnosis.module.scss'
import api from '../../services/api/api'

import { useAppContext } from '../../context/context'

export async function getStaticPaths() {
  const response = await api.get('diagnosis')

  const ids = response.data

  const paths = ids.map((path) => {
    return {
      params: {
        id: `${path.id}`,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const id = context.params.id
  const { data: diagnosis } = await api.get(`diagnosis/${id}`)

  return {
    props: diagnosis,
  }
}

function Diagnosis(props) {
  const router = useRouter()
  const { symptoms } = useAppContext()

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
          <div className={styles.title}>
            <label className={styles.label}>Diagnóstico:</label>
            <div className={styles.definition}>
              {props.name} ({props.code})
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.definition}>
              <label className={styles.label}>Definição:</label>
              {props.definition}
            </div>
          </div>
          <div className={styles.info}>
            <label className={styles.label}>Características Definidoras:</label>
            <div className={styles.definition}>
              {props.symptoms.map((symptom) => (
                <div
                  key={symptom.id}
                  className={symptoms.indexOf(symptom.id) !== -1 ? styles.bold : ''}
                >
                  {symptom.name};
                </div>
              ))}
            </div>
          </div>
          <div className={styles.info}>
            <label className={styles.label}>Fatores Relacionados:</label>
            <div className={styles.definition}>{props.causes}</div>
          </div>
          <button
            type="button"
            className={styles.button}
            onClick={() => router.back()}
          >
            Voltar
          </button>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Diagnosis
