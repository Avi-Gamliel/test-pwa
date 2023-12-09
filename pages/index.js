import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import CodeEditor from './codeEditor'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>EasyCode</title>
        <meta name="description" content="javascript playground" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <CodeEditor />
      </main>

    
    </div>
  )
}
