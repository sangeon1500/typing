import styles from "../styles/components/TypingModal.module.scss"

interface TypingModalProps {
  totalNumber: number
  validNumber: number
  totalPressNumber: number
  backSpacePressNumber: number
  progressTime: number
}

const TypingModal = ({
  totalNumber,
  validNumber,
  totalPressNumber,
  backSpacePressNumber,
  progressTime,
}: TypingModalProps) => {
  // 타수 : 현재속도 = (타수-백스페이스*2) / 경과시간(초) * 60초
  // 정확도 : (정확히 입력한 문자열 길이/전체 문자열 길이) * 100

  return (
    <>
      <div className={styles.background} />
      <div className={styles.container}>
        <p>총 글자 : {totalNumber}</p>
        <p>맞은 글자 : {validNumber}</p>
        <p>소요 시간 : {progressTime}</p>
        <p>
          타수 :
          {Math.floor(
            ((totalPressNumber - backSpacePressNumber * 2) / progressTime) * 60,
          )}
        </p>
        <p>정확도 : {`${Math.floor((validNumber / totalNumber) * 100)}`}</p>
        <p>완료</p>
      </div>
    </>
  )
}

export default TypingModal
