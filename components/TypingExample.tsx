interface TypingExampleProp {
  changeState: (newTarget: string) => void
}

const TypingExample = ({ changeState }: TypingExampleProp) => {
  const exampleList = ["안녕하세요", "펴나니", "가좌동", "실버타운", "요양원"]

  return (
    <div>
      {exampleList.map((example) => (
        <p
          key={example}
          style={{
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
