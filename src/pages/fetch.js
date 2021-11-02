import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { jsPDF } from 'jspdf'

import Head from 'next/head'
import Header from '../components/header/index'
import Footer from '../components/footer/index'
import Link from 'next/link'
import api from '../services/api/api'

import { useAppContext } from '../context/context'

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
  const [diagnostics, setDiagnostics] = useState(props.diagnostics)
  const router = useRouter()
  const { authenticated } = useAppContext()

  const removeDiagnosis = (id) => {
    setDiagnostics(diagnostics.filter((diagnosis) => diagnosis.id !== id))
  }

  const handleDisplay = () => {
    setShow(!show)
  }

  const handlePath = (id) => {
    return `/diagnosis/${id}`
  }

  const generatePdf = async (diagnostics) => {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF()
    doc.setFont('Roboto', 'bold')
    doc.setFontSize(20)
    doc.setTextColor(89, 89, 89)
    doc.text(document.getElementById('title').innerHTML, 63, 15)
    doc.setDrawColor(204, 25, 29)
    doc.line(63, 17, 153, 17)
    let gap = 0
    const MaxHeightPage = doc.internal.pageSize.getHeight() - 20
    let pageHeight
    doc.setFont('Roboto', 'normal')
    doc.setFontSize(13)

    diagnostics.forEach((diagnosis) => {
      doc.setFillColor(204, 25, 29)
      doc.rect(18, 30.6 + 12 * gap, 3, 1, 'F')

      doc.text(diagnosis.name, 25, 33 + 12 * gap)
      gap += 1
      pageHeight = 33 + 12 * gap

      if (pageHeight >= MaxHeightPage) {
        doc.addPage()
        gap = 0
      }

      diagnosis.related.forEach((symptom) => {
        doc.setDrawColor(204, 25, 29)
        doc.circle(32, 27.8 + 12 * gap, 1, 'S')
        doc.text(symptom.name, 35, 29.5 + 12 * gap)
        gap += 1
        pageHeight = 29.5 + 12 * gap

        if (pageHeight >= MaxHeightPage) {
          doc.addPage()
          gap = 0
        }
      })
    })

    const date = new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'full',
      timeStyle: 'long',
    }).format(new Date())

    doc.line(5, 276, 205, 276)
    doc.line(5, 275, 205, 275)
    doc.setFont('Cinzel', 'normal')
    doc.setFontSize(9)
    doc.text(date, 15, 285)
    doc.text('Nursing DiagnosIC', 175, 285)
    doc.save('diagnóstico de enfermagem.pdf')
  }

  useEffect(() => {
    if (!authenticated) {
      router.push('/')
    }
  }, [])

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
              onClick={() => generatePdf(diagnostics)}
              className={styles.button}
            >
              <i className="fas fa-print"></i>
            </button>
          </div>
          <ul className={styles.list}>
            {diagnostics.map((diagnosis, index) => (
              <li key={diagnosis.id} className={styles.listitem}>
                <div className={styles.item}>
                  <div
                    className={styles.removeButton}
                    onClick={() => removeDiagnosis(diagnosis.id)}
                  >
                    <i className={`${styles.removeIcon} far fa-trash-alt`}></i>
                  </div>
                  <div id={`diagnosis_${index}`}>{diagnosis.name}</div>{' '}
                  <Link href={handlePath(diagnosis.id)}>
                    <i className="fas fa-search"></i>
                  </Link>
                </div>

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
