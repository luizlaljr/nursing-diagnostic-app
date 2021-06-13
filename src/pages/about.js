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
        <title>Nursing DiagnosIC</title>
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
            Nursing DiagnosIC é um aplicativo de apoio e decisão clínica para o
            enfermeiro que atua com pacientes com insuficiência cardíaca. Este
            aplicativo foi baseado na teoria dos Padrões Funcionais de Marjory Gordon
            e possui o objetivo de estimular o raciocínio clínico através do sistema
            de linguagem padronizada da NANDA-I. Desenvolvido como produto de
            mestrado da enfermeira Alyne Santos Borges.
          </p>
          <div className={styles.subtitle}>
            <h6>COLABORADORES</h6>
          </div>
          <ul>
            <li>Enfermeira Mestranda Alyne Santos Borges</li>
            <li>
              Prof. Dra Ana Carla Dantas Cavalcanti (Escola de enfermagem/UFF){' '}
            </li>
            <li>Dr. Flávio Luiz Seixas (Instituto de computação/UFF)</li>
          </ul>
          <div className={styles.subtitle}>
            <h6>DESENVOLVEDORES</h6>
          </div>
          <ul>
            <li>Gisely Barbosa (Instituto de computação/UFF)</li>
            <li>Luiz Alberto Alves de Brito Junior (Instituto de computação/UFF)</li>
          </ul>
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

export default About
