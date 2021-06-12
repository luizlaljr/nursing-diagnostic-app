import React, { useState } from 'react'
import Head from 'next/head'
import Header from '../../components/header/index'
import Breadcrumb from '../../components/utils/breadcrumb/stepNavigation'
import Checkbox from '../../components/utils/checkbox/checkbox'
import Button from '../../components/utils/button/button'
import Footer from '../../components/footer/index'
import styles from '../../styles/Domain.module.scss'
import LottieComponent from '../../components/lottie/index'
import api from '../../services/api/api'
import { useAppContext } from '../../context/context'

export async function getStaticPaths() {
  const response = await api.get('domain')

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
  const { data: domain } = await api.get(`domain/${id}`)
  const { data: domains } = await api.get('domain')

  const response = {
    domain,
    domains,
  }
  return {
    props: response,
  }
}

function Domain(props) {
  const [loading, setLoading] = useState(false)
  const { symptoms } = useAppContext()

  const handleLoading = () => {
    setLoading(true)
  }

  const handleFetch = () => {
    let ids = '/fetch?id='
    for (let i = 0; i < symptoms.length; i++) {
      if (i > 0) {
        ids += '&id='
      }
      ids += `${symptoms[i]}`
    }
    return ids === '/fetch?id=' ? '/' : ids
  }

  const handleBackButton = (id) => {
    return id === 1 ? '/' : (id - 1).toString()
  }

  const handleNextButton = (id) => {
    return id < props.domains.length ? (id + 1).toString() : handleFetch()
  }
  if (loading) return <LottieComponent />
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
          <div className={styles.breadcrumb}>
            <Breadcrumb currentyID={props.domain.id} domains={props.domains} />
          </div>
          <div className={styles.header}>
            <h5 className={styles.name}>{props.domain.name}</h5>
            <h6 className={styles.definition}>{props.domain.definition}</h6>
          </div>
          <div className={styles.info}>
            <p className={styles.definition}>
              <strong>Definição: </strong>
              {props.domain.abstract}
            </p>
            <p className={styles.text}>
              Selecione abaixo as características definidoras encontradas:
            </p>
          </div>
          <ul className={styles.checklist}>
            {props.domain.symptoms.map((symptom) => (
              <li key={symptom.id} className={styles.listitem}>
                <Checkbox symptom={symptom}></Checkbox>
              </li>
            ))}
          </ul>

          <div className={styles.buttons}>
            <Button
              click={null}
              path={handleBackButton(props.domain.id)}
              background="#FFF"
              color="#514F5A"
            >
              Voltar
            </Button>
            {props.domain.id !== props.domains.length ? (
              <Button
                click={null}
                path={handleNextButton(props.domain.id)}
                background="#FFF"
                color="#514F5A"
              >
                Próximo
              </Button>
            ) : (
              <Button
                click={handleLoading}
                path={handleNextButton(props.domain.id)}
                background="#E31722"
                color="#FFF"
              >
                Buscar
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Domain
