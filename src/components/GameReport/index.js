import {useContext} from 'react'
import OptionsItem from '../OptionsItem'
import QuizContext from '../../context/QuizContext'
import Header from '../Header'
import './index.css'

const RenderOptions = ({type, options}) => {
  const l = options.length
  // console.log(type, options)
  // const {selectedOptionId} = this.state
  // const {is_correct} = options
  // console.log(l)
  const opList = ['A', 'B', 'C', 'D']
  let i = -1
  switch (type) {
    case 'DEFAULT':
      return (
        <ul className="options-list-container">
          {options.map(ele => {
            const fEle = {id: ele.id, text: ele.text, isCorrect: ele.is_correct}
            const {isCorrect} = fEle
            i += 1
            return (
              <OptionsItem
                optionId={isCorrect === 'true' ? ele.id : 'Not this'}
                optionNo={opList[i]}
                booleanType={l === 2}
                type={type}
                key={ele.id}
                selectOption={() => {
                  console.log('filler function')
                }}
                item={ele}
              />
            )
          })}
        </ul>
      )
    case 'IMAGE':
      return (
        <ul className="ul-options-list-container">
          {options.map(ele => {
            const fEle = {id: ele.id, text: ele.text, isCorrect: ele.is_correct}
            const {isCorrect} = fEle
            return (
              <OptionsItem
                optionId={isCorrect === 'true' ? ele.id : 'Not this'}
                type={type}
                key={ele.id}
                selectOption={() => {
                  console.log('filler function')
                }}
                item={ele}
              />
            )
          })}
        </ul>
      )
    case 'SINGLE_SELECT':
      return (
        <ul className="ul-options-list-container">
          {options.map(ele => {
            const fEle = {id: ele.id, text: ele.text, isCorrect: ele.is_correct}
            const {isCorrect} = fEle
            return (
              <OptionsItem
                optionId={isCorrect === 'true' ? ele.id : 'Not this'}
                type={type}
                key={ele.id}
                selectOption={() => {
                  console.log('filler function')
                }}
                item={ele}
              />
            )
          })}
        </ul>
      )
    default:
      return <p>Something Went Wrong in Options.</p>
  }
}

export default () => {
  const {unattemptedQuestions, correctAnswered, totalQuestions} = useContext(
    QuizContext,
  )
  const noOfUnattemptedQuestions = unattemptedQuestions.length
  const noOfCorrectAnsered = Object.keys(correctAnswered).length

  const unClassName =
    noOfUnattemptedQuestions > 0
      ? 'unattempted-questions-container'
      : 'unattempted-container'

  const unHeading =
    noOfUnattemptedQuestions > 0
      ? 'Unattempted Questions'
      : 'Attempted all the questions'

  return (
    <div className="quiz-container">
      <Header />
      <div className="home-container">
        <div className="report-content-holder">
          <div className="reports-data">
            <div className="marks-container">
              <div className="answered-questions-container">
                <p className="answered-para">
                  {noOfCorrectAnsered}
                  <span style={{color: '#475569'}}>/</span>
                  <span className="delight">{totalQuestions}</span>
                </p>
              </div>
            </div>
            <ul className="report-container">
              <li className="report-item">
                <span className="img-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/quiz-game-right-check-img.png"
                    alt="correct answer icon"
                    className="correct-state-icon"
                  />
                </span>
                {noOfCorrectAnsered} Correct answers
              </li>
              <li className="report-item">
                <span className="img-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/quiz-game-wrong-check-img.png"
                    alt="incorrect answer icon"
                    className="wrong-state-icon"
                  />
                </span>
                {totalQuestions - noOfUnattemptedQuestions - noOfCorrectAnsered}{' '}
                Wrong answers
              </li>
              <li className="report-item">
                <span className="img-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/quiz-game-un-answered-img.png"
                    alt="unattempted icon"
                    className="un-state-icon"
                  />
                </span>
                {noOfUnattemptedQuestions} Unattempted
              </li>
            </ul>
          </div>
          <div className={unClassName}>
            <h1 className="unattempted-questions-heading">{unHeading}</h1>
            <ul className="unattempted-questions-list">
              {unattemptedQuestions.map(item => {
                const {options, optionsType, questionText} = item
                return (
                  <li key={item.id} className="question-frame">
                    <p className="question">{questionText}</p>
                    <RenderOptions type={optionsType} options={options} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
