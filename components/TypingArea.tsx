import * as Hangul from "hangul-js"
import styles from "../styles/components/TypingArea.module.scss"
import { useEffect, useRef, useState } from "react"
import KeyboardReact, { KeyboardReactInterface } from "react-simple-keyboard"
import korean from "simple-keyboard-layouts/build/layouts/korean"
import "react-simple-keyboard/build/css/index.css"

interface TypingAreaProp {
  exampleValue: string
}

const TypingArea = ({ exampleValue }: TypingAreaProp) => {
  const keyboardRef = useRef<KeyboardReactInterface | null>(null)
  const [layoutName, setLayoutName] = useState("default")
  const [text, setText] = useState<string>("")
  const [exampleCharList, setExampleCharList] = useState<string[]>([])
  const [typingCount, setTypingCount] = useState<number>(0)
  const [inputString, setInputString] = useState<string>("")
  const [submitCount, setSubmitCount] = useState<number>(0)

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

  useEffect(() => {
    setExampleCharList(Hangul.disassemble(exampleValue))
    setTypingCount(0)
    setInputString("")
  }, [exampleValue])

  return (
    <div className={styles.wrap}>
      <p
        className={styles.exampleValue}
      >{`${exampleValue}${submitCount > 0 ? `- ${submitCount}번` : ""}`}</p>
      <div className={styles.box}>
        <form
          onSubmit={(e) => {
            e.preventDefault()

            if (exampleCharList.length === typingCount) {
              setSubmitCount((prevSubmitCount) => prevSubmitCount + 1)
              setTypingCount(0)
              setInputString("")
            }
          }}
        >
          <input
            className={styles.input}
            value={inputString}
            onChange={(e) => {
              setInputString(e.target.value)
            }}
            onKeyUp={({ key }) => {
              if (key === "Shift") {
                setLayoutName((prev) =>
                  prev === "default" ? "shift" : "default",
                )
              }

              // if (exampleCharList[typingCount] === key) {
              // setInputString(e.target.value)

              // setInputString(
              //   Hangul.assemble(
              //     exampleCharList.filter((_, index) => index <= typingCount),
              //   ),
              // )
              // }

              keyboardRef.current?.setInput(key)
              setTypingCount((prevCount) => prevCount + 1)
            }}
          />
        </form>
        <p className={styles.exampleText}>
          {inputString.split("").map((string, index) => (
            <span key={string + index}>{string}</span>
          ))}
        </p>
      </div>
      <KeyboardReact
        keyboardRef={(ref) => {
          keyboardRef.current = ref
        }}
        layoutName={layoutName}
        onChange={(key) => {
          setText(key)
        }}
        onKeyPress={(button) => {
          console.log("onKeyPress", button)
        }}
        display={{
          "{enter}": "Enter",
          "{shift}": "↑",
          "{.}": ".",
          "{space}": " ",
          "{dot}": ".",
          "{bksp}": "←",
          "{tab}": "Tab",
          "{lock}": "CapsLock",
        }}
        {...korean}
        layout={{
          default: [
            "1 2 3 4 5 6 7 8 9 0 - = {bksp}",
            "{tab} ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕ ㅑ ㅐ ㅔ [ ] \\",
            "{lock} ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ ; ' {enter}",
            "{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ , . / {shift}",
            ".com @ {space}",
          ],
          shift: [
            "1 2 3 4 5 6 7 8 9 0 - = {bksp}",
            "{tab} ㅃ ㅉ ㄸ ㄲ ㅆ ㅛ ㅕ ㅑ ㅒ ㅖ",
            "{lock} ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ : {enter}",
            "{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ , . / {shift}",
            ".com @ {space}",
          ],
        }}
        physicalKeyboardHighlight={true}
        syncInstanceInputs={true}
      />
    </div>
  )
}

export default TypingArea
