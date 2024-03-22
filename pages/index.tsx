import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import TypingExample from "../components/TypingExample"
import { useState, useEffect } from "react"
import TypingArea from "../components/TypingArea"

const Home: NextPage = () => {
  const [exampleValue, setExampleValue] = useState<string>("")
  const [totalCount, setTotalCount] = useState<number>(0)

  useEffect(() => {
    // 로컬스토리지
    if (totalCount === 0) {
      return
    }
    window.localStorage.setItem("totalCount", totalCount.toString())
  }, [totalCount])

  useEffect(() => {
    setTotalCount(Number(window.localStorage.getItem("totalCount")))
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>한글 타자 연습</title>
        <meta name="description" content="한글 타자 연습" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className={styles.main}>
        <div className={styles.typingBox}>
          <TypingExample
            exampleValue={exampleValue}
            changeState={setExampleValue}
            totalCount={totalCount}
          />
          <TypingArea
            exampleValue={exampleValue}
            setTotalCount={setTotalCount}
          />
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
