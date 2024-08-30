import QuizContext from '../../context/QuizContext'
import Header from '../Header'
import './index.css'

export default props => {
  const {history} = props
  const onClickReport = () => {
    history.push('/game-report')
  }

  return (
    <QuizContext.Consumer>
      {value => {
        const {unattemptedQuestions, correctAnswered, totalQuestions} = value
        const uCount = unattemptedQuestions.length
        const cCount = Object.keys(correctAnswered).length
        const nCount = totalQuestions - cCount - uCount
        const pass = cCount > 5
        // console.log(uCount, cCount, nCount)
        // console.log(totalQuestions)
        // console.log(cCount / totalQuestions)

        return (
          <div className="quiz-container">
            <Header />
            <div className="home-container">
              <div className={`result-container ${pass ? 'pass-bg' : ''}`}>
                <img
                  src={
                    pass
                      ? 'https://assets.ccbp.in/frontend/react-js/quiz-game-congrats-trophy-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/quiz-game-lose-img.png'
                  }
                  alt={pass ? 'won' : 'lose'}
                  className={pass ? 'won-image' : 'lose-image'}
                />
                <div className="result-content">
                  <p className="congrats-tag">
                    {pass ? 'Congrats!' : 'You lose!'}
                  </p>
                  <p className="result-tag">
                    {Math.round((cCount * 100) / totalQuestions)}% Correctly
                    Answered
                  </p>
                  {pass && (
                    <p className="end-tag">Quiz completed successfully</p>
                  )}
                  <p className="conclusion-para">
                    You attempted {cCount} out of {totalQuestions} questions as
                    correct
                  </p>
                  <button className="report-button" onClick={onClickReport}>
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }}
    </QuizContext.Consumer>
  )
}
