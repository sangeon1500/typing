import dynamic from "next/dynamic"
import Typing, { TypingMultiline } from "react-kr-typing-anim"

const TypingArea = () => {
  return (
    <div>
      <Typing
        Tag="div"
        preDelay={1000}
        postDelay={1000}
        cursor
        fixedWidth
        onDone={() => console.log("done")}
      >
        환영합니다!
      </Typing>

      <TypingMultiline
        strs={`환영합니다!
          즐거운 하루 되세요!`}
      />
    </div>
  )
}

export default TypingArea
