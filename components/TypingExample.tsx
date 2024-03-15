interface TypingExampleProp {
  exampleValue: string
  changeState: (newTarget: string) => void
}

const TypingExample = ({ exampleValue, changeState }: TypingExampleProp) => {
  const exampleList = ["안녕하세요", "펴나니", "가좌동", "실버타운", "요양원"]

  return (
    <div>
      <p>타이핑연습</p>
      <div>
        <img/>
        <p></p>
      </div>

      {exampleList.map((example) => (
        <p
          key={example}
          style={{
            color: exampleValue === example ? "#1646b5" : "#333333",
            cursor: "pointer",
          }}
          onClick={() => {
            changeState(example)
          }}
        >
          {example}
        </p>
      ))}
    </div>
  )
}

export default TypingExample
