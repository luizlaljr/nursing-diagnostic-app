import React, { useState, useEffect } from 'react'
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
    props: {
      rules,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    },
  }
}

function Begin(props) {
  const [start, setStart] = useState()
  const { rules } = useAppContext()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { authenticated, setAuthenticated } = useAppContext()
  const [loginScreen, setLoginScreen] = useState()

  const handleStart = () => {
    setStart(rules.size > 0)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    if (username !== '' && password !== '') {
      if (username === props.username && password === props.password) {
        setAuthenticated(true)
      }
    }

    setTimeout(() => {
      setLoading(false)
      setUsername('')
      setPassword('')
    }, 1500)
  }

  useEffect(() => {
    setLoginScreen(authenticated)
  }, [])

  useEffect(() => {
    setLoginScreen(authenticated)
  }, [authenticated])

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
      {!loginScreen && (
        <div className={styles.modal}>
          <div className={styles.modalContainer}>
            <h1>Login to Your Account</h1>
            <form>
              <input
                className={styles.username}
                type="text"
                name="user"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className={styles.password}
                type="password"
                name="pass"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {loading ? (
                <div className={styles.loaderContainer}>
                  <div className={styles.loader}></div>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  name="login"
                  className={styles.modalButton}
                >
                  Entrar
                </button>
              )}
            </form>
          </div>
        </div>
      )}
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h5 className={styles.name}>Coleta de Dados</h5>
          </div>
          <div className={styles.info}>
            <p className={styles.text}>
              Para o raciocínio diagnóstico é necessário a coleta de dados do
              paciente com insuficiência cardíaca. Marque abaixo as fontes de dados
              do paciente avaliado:
            </p>
          </div>
          <ul className={styles.checklist}>
            {props.rules.rules.map((rule) => (
              <li key={rule.id} className={styles.listitem}>
                <BasicCheckbox rule={rule} handleStart={handleStart}></BasicCheckbox>
              </li>
            ))}
          </ul>
          <div className={styles.info}>
            <p className={styles.text}>
              Após a união das fontes de dados encontradas, será possível navegar
              entre os domínios e escolher as características definidoras que mais se
              aplicam.
            </p>
          </div>
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
