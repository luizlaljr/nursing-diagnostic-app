import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '../components/header/index'
import Footer from '../components/footer/index'
import styles from '../styles/About.module.scss'

function About() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Sobre | ND</title>
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
            <h5>SOBRE</h5>
          </div>
          <p>
            Nursing DiagnosIC é um aplicativo de apoio a decisão clínica para
            enfermeiros que atuam no cuidado de pacientes com insuficiência cardíaca.
            Foi desenvolvido como parte de uma dissertação de mestrado do Programa
            Ciências do Cuidado em Saúde da Universidade Federal Fluminense (UFF).
          </p>
          <div className={styles.subtitle}>
            <h6>COLABORADORES</h6>
          </div>
          <ul>
            <li>Alyne Santos Borges</li>
            <li>Ana Carla Dantas Cavalcanti (Escola de enfermagem/UFF) </li>
            <li>Flávio Luiz Seixas (Instituto de computação/UFF)</li>
          </ul>
          <div className={styles.subtitle}>
            <h6>DESENVOLVEDORES</h6>
          </div>
          <ul>
            <li>Gisely Barbosa (Instituto de computação/UFF)</li>
            <li>Luiz Alberto Alves de Brito Junior (Instituto de computação/UFF)</li>
          </ul>
          <div className={styles.subtitle}>
            <h6>CONTATO</h6>
          </div>
          <p className={styles.email}>
            <a href="mailto:alyneborges@id.uff.br">alyneborges@id.uff.br</a>
            <a href="mailto:luiz_alberto@id.uff.br">luiz_alberto@id.uff.br</a>
            <a href="mailto:josefagisely@id.uff.br">josefagisely@id.uff.br</a>
          </p>
          <div>
            <button
              type="button"
              className={styles.button}
              onClick={() => router.back()}
            >
              Voltar
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default About
