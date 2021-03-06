import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '../../components/header/index'
import Breadcrumb from '../../components/utils/breadcrumb/stepNavigation'
import Checkbox from '../../components/utils/checkbox/checkbox'
import Button from '../../components/utils/button/button'
import Footer from '../../components/footer/index'
import styles from '../../styles/Domain.module.scss'
import api from '../../services/api/api'
import { useAppContext } from '../../context/context'

import * as ga from '../../lib/ga'

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
  const { authenticated } = useAppContext()
  const { symptoms } = useAppContext()
  const [fetchParams, setFetchParams] = useState('')
  const [show, setShow] = useState(false)
  const router = useRouter()

  const handleDisplay = () => {
    setShow(!show)
  }

  const handleFetchGA = () => {
    fetch()
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

  const handleBackButton = (order) => {
    return order === 1 ? '/begin' : (order - 1).toString()
  }

  const handleNextButton = (order) => {
    return order < props.domains.length ? (order + 1).toString() : handleFetch()
  }

  useEffect(() => {
    if (!authenticated) {
      router.push('/')
    }
  }, [])

  useEffect(() => {
    setFetchParams(symptoms)
  }, [symptoms])

  const fetch = () => {
    ga.event({
      action: 'fetch',
      params: {
        search_term: fetchParams,
      },
    })
  }
  return (
    <>
      <Head>
        <title>{props.domain.name} | ND</title>
        <meta
          name="description"
          content="Aplicativo de aux??lio ao diagn??stico de enfermagem card??aca"
        />
        <link rel="icon" href="/favicon.ico?v=2" />
      </Head>
      <Header />
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.breadcrumb}>
            <Breadcrumb currentyID={props.domain.order} domains={props.domains} />
          </div>
          <div className={styles.header}>
            <h5 onClick={handleDisplay} className={styles.definition}>
              {props.domain.definition}
              {show ? (
                <i className="fas fa-angle-up"></i>
              ) : (
                <i className="fas fa-search"></i>
              )}
            </h5>
          </div>
          <div className={styles.info}>
            <p
              className={styles.definition}
              style={{ display: show ? 'block' : 'none' }}
            >
              <strong>Defini????o: </strong>
              {props.domain.abstract}
            </p>
            <p className={styles.text}>
              Selecione abaixo as caracter??sticas definidoras encontradas:
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
              path={handleBackButton(props.domain.order)}
              background="#FFF"
              color="#514F5A"
              borderColor="#E31722"
            >
              Voltar
            </Button>
            {props.domain.order !== props.domains.length ? (
              <Button
                click={null}
                path={handleNextButton(props.domain.order)}
                background="#FFF"
                color="#514F5A"
                borderColor="#E31722"
              >
                Pr??ximo
              </Button>
            ) : (
              <Button
                click={handleFetchGA}
                path={handleNextButton(props.domain.order)}
                background="#E31722"
                color="#FFF"
                borderColor="#E31722"
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
