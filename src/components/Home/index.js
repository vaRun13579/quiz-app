import {useContext, useEffect} from 'react'
import QuizContext from '../../context/QuizContext'
import Header from '../Header'
import './index.css'

export default props => {
  const {history} = props
  const onClickQuizStart = () => {
    history.push('/quiz-game')
  }

  const {clearAllData} = useContext(QuizContext)

  useEffect(() => {
    clearAllData()
  }, [])

  return (
    <div className="quiz-container">
      <Header />
      <div className="home-container">
        <div className="home-content-holder">
          <div className="holder">
            <img
              src="https://res.cloudinary.com/dsnetbfzn/image/upload/v1724443489/quiz%20app%20resourses/undraw_Questions_re_1fy7_1_veyzex.png"
              alt="website logo"
              className="home-image"
            />
            <h1 className="home-heading">
              How Many Of These Questions Do You Actually Know?
            </h1>
            <p className="home-description">
              Test yourself with these easy quiz questions and answers
            </p>
            <button
              onClick={onClickQuizStart}
              type="button"
              className="start-quiz-button"
            >
              Start Quiz
            </button>
          </div>
          <div className="warning-message">
            <img
              className="warning-image"
              alt="warning icon"
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-error-img.png"
            />
            <p className="warning-msg">
              All the progress will be lost, if you reload during the quiz
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
