import React, { useState } from 'react'
import { jsPDF } from 'jspdf'
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

  const generatePdf = (diagnostics) => {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF()

    doc.text(document.getElementById('title').innerHTML, 65, 15)
    doc.line(65, 17, 140, 17)
    let gap = 0
    diagnostics.forEach((diagnosis) => {
      doc.rect(18, 27.6 + 12 * gap, 3, 1, 'F')
      doc.text(diagnosis.name, 25, 30 + 12 * gap)
      gap += 1

      diagnosis.related.forEach((symptom) => {
        doc.circle(32, 27.8 + 12 * gap, 1, 'S')
        doc.text(symptom.name, 35, 30 + 12 * gap)
        gap += 1
      })
    })
    doc.save('diagnóstico de enfermagem.pdf')
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
            <div className={styles.title}>
              <h5 id="title">Diagnósticos de Enfermagem</h5>
            </div>
            <button
              onClick={() => generatePdf(props.diagnostics)}
              className={styles.button}
            >
              <i className="fas fa-print"></i>
            </button>
          </div>
          <ul className={styles.list}>
            {props.diagnostics.map((diagnosis, index) => (
              <li key={diagnosis.id} className={styles.listitem}>
                <Link href={handlePath(diagnosis.id)}>
                  <a>
                    <div id={`diagnosis_${index}`}>{diagnosis.name}</div>{' '}
                    <i className="fas fa-search"></i>
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
