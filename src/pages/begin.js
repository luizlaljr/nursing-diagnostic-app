import React, { useState } from 'react'
import Head from 'next/head'
import Header from '../components/header/index'
import Button from '../components/utils/button/button'
import Footer from '../components/footer/index'
import BasicCheckbox from '../components/utils/basicCheckbox/basicCheckbox'
import list from '../services/rules/list'
import styles from '../styles/Begin.module.scss'
import { useAppContext } from '../context/context'

export async function getStaticProps() {
  const rules = list

  return {
    props: rules,
  }
}

function Begin(props) {
  const [start, setStart] = useState(false)
  const { rules } = useAppContext()

  const handleStart = () => {
    setStart(rules.size === 4)
  }

  return (
    <>
      <Head>
        <title>Início | ND</title>
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
            <h5 className={styles.name}>Raciocínio Clínico</h5>
          </div>
          <div className={styles.info}>
            <p className={styles.text}>
              Para realizar o raciocínio clínico através do processo de enfermagem,
              primeiro será necessário concluir todas as etapas de coleta de dados
              relacionadas abaixo:
            </p>
          </div>
          <ul className={styles.checklist}>
            {props.rules.map((rule) => (
              <li key={rule.id} className={styles.listitem}>
                <BasicCheckbox rule={rule} handleStart={handleStart}></BasicCheckbox>
              </li>
            ))}
          </ul>
          <div className={styles.buttons}>
            <Button
              click={null}
              path="/"
              background="#FFF"
              color="#514F5A"
              borderColor="#E31722"
            >
              Voltar
            </Button>
            {start ? (
              <Button
                click={null}
                path="/domain/1"
                background="#E31722"
                color="#FFF"
                borderColor="#E31722"
              >
                Continuar
              </Button>
            ) : (
              <div className={styles.noLink}>Continuar</div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Begin
