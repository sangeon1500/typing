import * as Hangul from "hangul-js"
import styles from "../styles/components/TypingArea.module.scss"
import { useEffect, useRef, useState } from "react"
import KeyboardReact, { KeyboardReactInterface } from "react-simple-keyboard"

interface TypingAreaProp {
  exampleValue: string
}

const TypingArea = ({ exampleValue }: TypingAreaProp) => {
  const keyboardRef = useRef<KeyboardReactInterface>(null)
  const [layoutName, setLayoutName] = useState("default")
  const [text, setText] = useState<string>("")
  const [exampleCharList, setExampleCharList] = useState<string[]>([])
  const [typingCount, setTypingCount] = useState<number>(0)
  const [inputString, setInputString] = useState<string>("")

  const koreanLayout = {
    default: [
      "ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕ ㅑ ㅐ ㅔ",
      "ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ",
      "{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ {pre}",
      "{space} {dot} {enterText}",
    ],
    shift: [
      "ㅃ ㅉ ㄸ ㄲ ㅆ ㅛ ㅕ ㅑ ㅒ ㅖ",
      "ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ",
      "{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ {pre}",
      "{space} {dot} {enterText}",
    ],
  }

  const onKeyPress = (key: string) => {
    if (key === "{pre}") {
      const res = text.slice(0, -1)
      setText(res)
    } else if (key === "{shift}") {
      setLayoutName((prev) => (prev === "default" ? "shift" : "default"))
    } else if (key === "{enterNum}" || key === "{enterText}") {
      console.log("enter clicked!")
    } else if (key === "{dot}") {
      setText((prev) => prev + ".")
    } else if (key === "{space}") {
      setText((prev) => prev + " ")
    } else {
      setText((prev) => Hangul.assemble(Hangul.disassemble(prev + key)))
    }
  }

  const onChangeInput = (key: string) => {
    setText(key)

    if (keyboardRef?.current) {
      keyboardRef?.current?.setInput(key)
    }
  }

  useEffect(() => {
    setExampleCharList(Hangul.disassemble(exampleValue))
  }, [exampleValue])

  return (
    <div className={styles.wrap}>
      <p className={styles.exampleValue}>{exampleValue}</p>
      <div className={styles.box}>
        <input
          className={styles.input}
          value={inputString}
          onKeyUp={({ key }) => {
            if (exampleCharList[typingCount] === key) {
              setTypingCount((prevCount) => prevCount + 1)

              setInputString(
                Hangul.assemble(
                  exampleCharList.filter((_, index) => index <= typingCount),
                ),
              )
            }
          }}
        />
        <p className={styles.exampleText}>
          {inputString.split("").map((string, index) => (
            <span key={string + index}>{string}</span>
          ))}
        </p>
      </div>
      {/* <KeyboardReact
        keyboardRef={(ref) => {
          keyboardRef.current = ref
        }}
        layoutName={layoutName}
        layout={{ ...koreanLayout }}
        onChange={(key) => {
          setText(key)
        }}
        onKeyPress={onKeyPress}
        display={{
          "{enterText}": "Enter",
          "{shift}": "↑",
          "{.}": ".",
          "{space}": " ",
          "{dot}": ".",
          "{pre}": "←",
        }}
        text
      /> */}
    </div>
  )
}

export default TypingArea
