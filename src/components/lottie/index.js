import React from 'react'
import LottieAnimation from 'react-lottie'
import styles from './styles.module.scss'
import animationData from '../../assets/heartbeat.json'
import heart from '../../assets/heart.svg'

function Lottie() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRation: 'xMidYmid slice',
    },
  }

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={heart} alt="heart with pulse" />
        <div className={styles.lottie}>
          <LottieAnimation options={defaultOptions} height={140} width={140} />
        </div>
      </div>
      <p className={styles.subtitle}>Carregando possíveis diagnósticos...</p>
    </div>
  )
}

export default Lottie
