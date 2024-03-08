import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import TypingExample from "../components/TypingExample"
import { useState } from "react"
import TypingArea from "../components/TypingArea"

const Home: NextPage = () => {
  const [exampleValue, setExampleValue] = useState<string>("")

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>한글 타이핑</h1>
        <div className={styles.typingBox}>
          <TypingExample changeState={setExampleValue} />
          {exampleValue ? (
            <TypingArea exampleValue={exampleValue} />
          ) : (
            <p>예시용 단어를 선택하세요.</p>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
