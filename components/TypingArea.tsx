import * as Hangul from "hangul-js"
import styles from "../styles/components/TypingArea.module.scss"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import KeyboardReact, {
  KeyboardElement,
  KeyboardReactInterface,
} from "react-simple-keyboard"
import "react-simple-keyboard/build/css/index.css"
import { typingMap } from "../utils/typing"

interface TypingAreaProp {
  exampleValue: string
  setTotalCount: Dispatch<SetStateAction<number>>
}

const TypingArea = ({ exampleValue, setTotalCount }: TypingAreaProp) => {
  const keyboardRef = useRef<KeyboardReactInterface | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const isSubmitRef = useRef<boolean>(false)
  const buttonRef = useRef<KeyboardElement | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [layoutName, setLayoutName] = useState("default")
  const [text, setText] = useState<string>("")
  const [exampleList, setExampleList] = useState<string[]>([])
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

  const handleComplete = () => {
    setSubmitCount(submitCount + 1)
    setCurrentIndex(currentIndex + 1)
    setTotalCount((totalCount: number) => totalCount + 1)
    setInputString("")
    isSubmitRef.current = true
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    setInputString("")
    setSubmitCount(0)
    isSubmitRef.current = false
    setExampleList(typingMap[exampleValue] ?? [])
  }, [exampleValue])

  useEffect(() => {
    // const exampleDiassemble = Hangul.disassemble(exampleValue)
    // const inputeDiassemble = Hangul.disassemble(inputString)
    // const nextChar = exampleDiassemble[inputeDiassemble?.length || 0]
    // if (buttonRef.current) {
    //   buttonRef.current.style.backgroundColor = "#FFFFFF"
    //   buttonRef.current.style.color = "#333333"
    // }
    // buttonRef.current =
    //   keyboardRef.current?.buttonElements[nextChar]?.[0] || null
    // if (buttonRef.current) {
    //   buttonRef.current.style.backgroundColor = "#ff845c"
    //   buttonRef.current.style.color = "#E64234"
    // }
  }, [inputString])

  return (
    <div className={styles.wrap}>
      <ul
        className={styles.exampleWrap}
        style={{ transform: `translateY(-${currentIndex * 42}px)` }}
      >
        {exampleList?.map((examString, index) => (
          <li
            key={examString + index}
            className={
              currentIndex === index
                ? styles.exampleItemActive
                : styles.exampleItem
            }
          >
            {examString}
          </li>
        ))}
      </ul>
      <p className={styles.exampleValue}>{exampleValue}</p>
      <div className={styles.box}>
        <input
          className={styles.input}
          value={inputString}
          ref={inputRef}
          onChange={(e) => {
            if (isSubmitRef.current) return

            const newValue = e.target.value
            setInputString(newValue)

            if (newValue?.length > exampleList[currentIndex]?.length) {
              handleComplete()
            }
          }}
          onKeyDown={({ key }) => {
            if (key === "Shift") {
              setLayoutName((prev) =>
                prev === "default" ? "shift" : "default",
              )
              return
            }

            if (
              key === "Enter" &&
              inputString?.length === exampleList[currentIndex]?.length
            ) {
              handleComplete()
              return
            }

            keyboardRef.current?.setInput(key)
          }}
        />
        <div style={{ position: "relative", margin: "10px 0" }}>
          <p className={styles.typingText}>
            {inputString.split("").map((string, index) => (
              <span key={string + index}>{string}</span>
            ))}
          </p>
          <p className={styles.exampleText}>{exampleList[currentIndex]}</p>
        </div>
      </div>
      <KeyboardReact
        keyboardRef={(ref) => {
          keyboardRef.current = ref
        }}
        layoutName={layoutName}
        onKeyPress={(button) => {
          onKeyPress(button)
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
