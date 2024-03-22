import styles from "../styles/components/TypingArea.module.scss"
interface TypingExampleProp {
  changeState: (newTarget: string) => void
  totalCount: number
}

const TypingExample = ({ changeState, totalCount }: TypingExampleProp) => {
  const exampleList = ["안녕하세요", "펴나니", "가좌동", "실버타운", "요양원"]
  return (
    <div>
      <div>타이핑연습</div>
      <div>
        <img src="/images/user.png" width="150"></img>
        <p>{`총 성공횟수 : ${totalCount}회`}</p>
      </div>
      <div className={styles.box}>
        <ul className={styles.buttonUl}>
          {exampleList.map((example) => (
            <li key={example} style={{ listStyle: "none" }}>
              <button
                className={styles.typeButton}
                key={example}
                onClick={() => {
                  changeState(example)
                }}
              >
                {example}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TypingExample
