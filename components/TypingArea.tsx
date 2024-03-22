import * as Hangul from "hangul-js"
import styles from "../styles/components/TypingArea.module.scss"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import KeyboardReact, {
  KeyboardElement,
  KeyboardReactInterface,
} from "react-simple-keyboard"
import "react-simple-keyboard/build/css/index.css"
import { typingMap } from "../utils/typing"
import TypingModal from "./TypingModal"

interface TypingAreaProp {
  exampleValue: string
  setTotalCount: Dispatch<SetStateAction<number>>
}

const TypingArea = ({ exampleValue, setTotalCount }: TypingAreaProp) => {
  const keyboardRef = useRef<KeyboardReactInterface | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const buttonRef = useRef<KeyboardElement | null>(null)
  const exampleListRef = useRef<string[] | null>(null)
  const [currentExampleString, setCurrentExampleString] = useState<string>("")
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [layoutName, setLayoutName] = useState("default")
  const [text, setText] = useState<string>("")
  const [exampleList, setExampleList] = useState<string[]>([])
  const [inputString, setInputString] = useState<string>("")
  const [validNumber, setValidNumer] = useState<number>(0)
  const [totalNumber, setTotalNumer] = useState<number>(0)
  const [inputStringList, setInputStringList] = useState<string[]>([])
  const [submitCount, setSubmitCount] = useState<number>(0)
  const [showModal, setShowModal] = useState<boolean>(false)
  const totalPressNumber = useRef<number>(0)
  const backSpacePressNumber = useRef<number>(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [time, setTime] = useState<number>(0)

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

  const setNextString = () => {
    setInputStringList((prev) => {
      return [...prev, inputString]
    })

    setCurrentIndex(currentIndex + 1)
  }

  const formatTime = (time: number) => (time < 10 ? `0${time}` : time)

  useEffect(() => {
    inputRef.current?.focus()
  }, [exampleValue])

  useEffect(() => {
    if (!exampleList?.length) return

    if (inputStringList.length === exampleList.length) {
      setShowModal(true)
      setInputString("")

      let tempTotalNumber = 0
      let tempValidNumber = 0

      exampleList.forEach((exampleText, index) => {
        const exampleCharList = exampleText?.split("")
        const inputCharList = inputStringList[index]?.split("")

        const checkList = exampleCharList.filter(
          (char, charIndex) => char === inputCharList[charIndex],
        )

        tempTotalNumber += exampleCharList.length
        tempValidNumber += checkList.length
      })

      setTotalNumer(tempTotalNumber)
      setValidNumer(tempValidNumber)

      return
    }

    setCurrentExampleString(exampleList[currentIndex])
  }, [currentIndex, inputStringList, exampleList])

  useEffect(() => {
    setInputString("")
    exampleListRef.current = Hangul.disassemble(currentExampleString ?? "")
  }, [currentExampleString])

  useEffect(() => {
    setExampleList(typingMap[exampleValue] ?? [])
    setSubmitCount(0)
  }, [exampleValue])

  useEffect(() => {
    const inputeDiassemble = Hangul.disassemble(inputString)
    const nextChar = (exampleListRef.current ?? [])[
      inputeDiassemble?.length || 0
    ]

    if (buttonRef.current) {
      buttonRef.current.style.backgroundColor = "#FFFFFF"
      buttonRef.current.style.color = "#333333"
    }

    buttonRef.current =
      keyboardRef.current?.buttonElements[nextChar]?.[0] || null

    if (buttonRef.current) {
      buttonRef.current.style.backgroundColor = "#ff845c"
      buttonRef.current.style.color = "#E64234"
    }
  }, [inputString, currentIndex])

  useEffect(() => {
    if (!exampleValue) return

    const interval = setInterval(() => {
      setTime((prev) => prev + 1)
      setSeconds((prevSeconds) => {
        if (prevSeconds === 59) {
          setMinutes((prevMinutes) => prevMinutes + 1)
          return 0
        }
        return prevSeconds + 1
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [exampleValue])

  return (
    <div className={styles.wrap}>
      <div className={styles.exampleWrap}>
        <ul
          className={styles.exampleBox}
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
      </div>
      <p className={styles.exampleValue}>
        {exampleValue
          ? `${exampleValue} - 걸린 시간 : ${formatTime(minutes)}:${formatTime(seconds)}`
          : "좌측의 타이핑 연습 주제를 선택해주세요."}
      </p>
      <div className={styles.box}>
        <form
          onSubmit={(e) => {
            e.preventDefault()

            if (inputString?.length === exampleList[currentIndex]?.length) {
              setNextString()
            }
          }}
        >
          <input
            className={styles.input}
            value={inputString}
            ref={inputRef}
            disabled={!exampleValue}
            onChange={(e) => {
              if (!exampleValue) return

              const newValue = e.target.value

              if (newValue?.length > exampleList[currentIndex]?.length) {
                setNextString()
                return
              }

              setInputString(newValue)
            }}
            onKeyDown={({ key }) => {
              if (key === "Shift") {
                setLayoutName((prev) =>
                  prev === "default" ? "shift" : "default",
                )
                return
              }

              keyboardRef.current?.setInput(key)

              if (key === "Backspace") {
                backSpacePressNumber.current += 1
              }

              totalPressNumber.current += 1
            }}
          />
        </form>
        <div style={{ position: "relative", margin: "10px 0" }}>
          <p className={styles.exampleText}>{exampleList[currentIndex]}</p>
          <p className={styles.typingText}>
            {inputString.split("").map((string, index) => (
              <span key={string + index}>{string}</span>
            ))}
          </p>
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

      {showModal ? (
        <TypingModal
          totalNumber={totalNumber}
          validNumber={validNumber}
          totalPressNumber={totalPressNumber.current}
          backSpacePressNumber={backSpacePressNumber.current}
          progressTime={time}
        />
      ) : null}
    </div>
  )
}

export default TypingArea
