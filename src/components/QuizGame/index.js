import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import OptionsItem from '../OptionsItem'
import QuizContext from '../../context/QuizContext'

import './index.css'

const pageView = ['Loading', 'Success', 'Fail']
let cid

class QuizGame extends Component {
  state = {
    qNo: 1,
    questionsList: [],
    timer: 15,
    totalQuestions: 0,
    // choosed: false,
    pageState: pageView[0],
    quizOver: false,
    selectedOptionId: 'Not Selected',
  }

  setOptionId = id => {
    this.setState({selectedOptionId: id})
  }

  // toggleChoosed = () => {
  //   this.setState({choosed: true})
  // }

  setCounter = () => {
    this.setState({timer: 15})
  }

  startCounter = () => {
    clearInterval(cid)
    cid = setInterval(() => {
      this.setState(ps => ({timer: ps.timer - 1}))
    }, 1000)
  }

  componentWillUnmount = () => {
    clearInterval(cid)
  }

  componentDidUpdate = props => {
    const {history} = props
    const {timer, quizOver, questionsList, qNo, selectedOptionId} = this.state
    // console.log(prevState, qNo)
    if (timer === -1) {
      if (selectedOptionId === 'Not Selected') {
        this.updateFunction(questionsList[qNo - 1])
      }
      this.nextQuestion()
      this.setCounter()
      this.startCounter()
    }
    if (quizOver) {
      history.replace('/game-results')
    }
    if (selectedOptionId !== 'Not Selected') {
      clearInterval(cid)
    }
  }

  nextQuestion = () => {
    const {qNo, totalQuestions, selectedOptionId} = this.state
    if (selectedOptionId !== 'Not Selected') {
      this.setState({selectedOptionId: 'Not Selected'})
    }
    if (qNo < totalQuestions) {
      this.setState(ps => ({qNo: ps.qNo + 1}))
      this.setCounter()
      this.startCounter()
    } else {
      this.setState({quizOver: true})
    }
  }

  RenderOptions = ({type, options}) => {
    // console.log(type, options)
    const {selectedOptionId} = this.state
    const l = options.length
    // console.log(l)
    const opList = ['A', 'B', 'C', 'D']
    let i = -1
    switch (type) {
      case 'DEFAULT':
        return (
          <ul className="options-list-container">
            {options.map(ele => {
              i += 1
              return (
                <OptionsItem
                  optionId={selectedOptionId}
                  optionNo={opList[i]}
                  booleanType={l === 2}
                  type={type}
                  key={ele.id}
                  selectOption={this.setOptionId}
                  item={ele}
                />
              )
            })}
          </ul>
        )
      case 'IMAGE':
        return (
          <ul className="image-options-list-container">
            {options.map(ele => (
              <OptionsItem
                optionId={selectedOptionId}
                type={type}
                key={ele.id}
                selectOption={this.setOptionId}
                item={ele}
              />
            ))}
          </ul>
        )
      case 'SINGLE_SELECT':
        return (
          <ul className="ul-options-list-container">
            {options.map(ele => (
              <OptionsItem
                optionId={selectedOptionId}
                type={type}
                key={ele.id}
                selectOption={this.setOptionId}
                item={ele}
              />
            ))}
          </ul>
        )
      default:
        return <p>Something Went Wrong in Options.</p>
    }
  }

  LoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0EA5E9" height={50} width={50} />
    </div>
  )

  onClickNextButton = () => {
    const {selectedOptionId} = this.state
    if (selectedOptionId !== 'Not Selected') {
      this.nextQuestion()
    }
    console.log('')
  }

  SuccessView = () => {
    const {
      timer,
      questionsList,
      qNo,
      totalQuestions,
      selectedOptionId,
    } = this.state
    const question = questionsList[qNo - 1]
    const {options} = question
    // console.log(qNo, totalQuestions)
    // if (timer === 0) {
    //   this.nextQuestion()
    // }
    const nextButton =
      selectedOptionId !== 'Not Selected'
        ? 'next-button selected-button'
        : 'next-button'

    return (
      <>
        <div className="counter-qno">
          <span className="question-number">
            <p className="q-h">Question</p>
            <p className="qno">
              {qNo}/{totalQuestions}
            </p>
          </span>
          <span className="counter">{timer}</span>
        </div>
        <div className="question-container">
          <div className="question-content-holder">
            <p className="question">{question.questionText}</p>
            <this.RenderOptions type={question.optionsType} options={options} />
            <button
              type="button"
              className={nextButton}
              onClick={this.onClickNextButton}
            >
              {qNo === totalQuestions ? 'Submit' : 'Next Question'}
            </button>
          </div>
        </div>
      </>
    )
  }

  FailView = () => (
    <div className="fail-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png "
        alt="failure view"
        className="fail-view-image"
      />
      <h1 className="fail-view-heading">Something went wrong</h1>
      <p className="fail-view-description">
        Our server are busy please try again
      </p>
      <button
        type="button"
        onClick={this.retryFunction}
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  retryFunction = () => {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({pageState: pageView[0]})
    const url = 'https://apis.ccbp.in/assess/questions'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const {total, questions} = data
      const fQuestions = questions.map(ele => ({
        id: ele.id,
        questionText: ele.question_text,
        optionsType: ele.options_type,
        options: ele.options,
      }))
      this.setState(
        {
          questionsList: fQuestions,
          totalQuestions: total,
          pageState: pageView[1],
        },
        this.setCounter(),
        this.startCounter(),
        this.setTotalInContext(total),
      )
    } else {
      this.setState({pageState: pageView[2]})
    }
  }

  RenderView = () => {
    const {pageState} = this.state
    switch (pageState) {
      case pageView[0]:
        return <this.LoaderView />
      case pageView[1]:
        return <this.SuccessView />
      case pageView[2]:
        return <this.FailView />
      default:
        return <p>Oops something went wrong while rendering a view!</p>
    }
  }

  componentDidMount = () => {
    this.fetchData()
  }

  render() {
    return (
      <QuizContext.Consumer>
        {value => {
          const {setUnattemptedQuestions, setTotalQuestions} = value
          this.setTotalInContext = setTotalQuestions
          this.updateFunction = setUnattemptedQuestions

          return (
            <div className="quiz-container">
              <Header />
              <div className="home-container">
                <div className="quiz-content-holder">
                  <this.RenderView />
                </div>
              </div>
            </div>
          )
        }}
      </QuizContext.Consumer>
    )
  }
}

export default QuizGame
