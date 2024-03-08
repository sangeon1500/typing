// import Typing, { TypingMultiline } from "react-kr-typing-anim"
import * as Hangul from "hangul-js"
import styles from "../styles/components/TypingArea.module.scss"
import { useState } from "react"
import KeyboardReact from "react-simple-keyboard"

const TypingArea = () => {
  const [layoutName, setLayoutName] = useState("default")

  const [text, setText] = useState<string>("아이엠랩")

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

  return (
    <div className={styles.wrap}>
      <div className={styles.box}>
        <input
          className={styles.input}
          onChange={(e) => {
            setText(e.target.value)
          }}
        />
        <p className={styles.exampleText}>{text}</p>
      </div>
      <KeyboardReact
        layoutName={layoutName}
        layout={{ ...koreanLayout }}
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
      />
    </div>
  )
}

export default TypingArea
