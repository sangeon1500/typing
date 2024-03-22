import styles from "../styles/components/TypingArea.module.scss"
import { typingMap } from "../utils/typing"

interface TypingExampleProp {
  exampleValue: string
  changeState: (newTarget: string) => void
  totalCount: number
}

const TypingExample = ({
  exampleValue,
  changeState,
  totalCount,
}: TypingExampleProp) => {
  return (
    <div>
      <div>타이핑연습</div>
      <div>
        <img src="/images/user.png" width="150"></img>
        <p>{`총 성공횟수 : ${totalCount}회`}</p>
      </div>
      <div className={styles.box}>
        <ul className={styles.buttonUl}>
          {Object.keys(typingMap).map((example) => (
            <li key={example} style={{ listStyle: "none" }}>
              <button
                className={
                  exampleValue === example
                    ? styles.typeButtonActive
                    : styles.typeButton
                }
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
