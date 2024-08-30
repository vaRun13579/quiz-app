import {useState} from 'react'
import {Redirect, Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import GameResults from './components/GameResults'
import QuizGame from './components/QuizGame'
import NotFound from './components/NotFound'
import Home from './components/Home'
import Authenticator from './components/Authenticator'
import GameReport from './components/GameReport'
import QuizContext from './context/QuizContext'

import './App.css'

// Replace your code here
const App = () => {
  const [unattemptedList, setList] = useState([])
  const [totalQuestions, setTotal] = useState(0)
  const [answered, setAnswered] = useState({})

  const updateUnattemptedList = v => {
    // console.log('got a value: ', v)
    if (v === 'clear') {
      setList([])
      return
    }
    setList(ps => [...ps, v])
  }
  const updateTotalQuestions = t => {
    setTotal(t)
  }
  const updateAnswered = id => {
    if (id === 'clear') {
      setAnswered({})
      return
    }
    setAnswered(ps => {
      const dict = {...ps}
      dict[id] = 1
      return dict
    })
  }

  const clearAll = () => {
    updateUnattemptedList('clear')
    updateTotalQuestions(0)
    updateAnswered('clear')
  }

  // console.log('unattempted list is ', unattemptedList)
  // console.log('totalQuestions=', totalQuestions)
  // console.log('answered=', answered)

  return (
    <QuizContext.Provider
      value={{
        unattemptedQuestions: unattemptedList,
        totalQuestions,
        correctAnswered: answered,
        setCorrectAnswer: updateAnswered,
        setTotalQuestions: updateTotalQuestions,
        setUnattemptedQuestions: updateUnattemptedList,
        clearAllData: clearAll,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <Authenticator exact path="/" component={Home} />
        <Authenticator exact path="/quiz-game" component={QuizGame} />
        <Authenticator exact path="/game-results" component={GameResults} />
        <Authenticator exact path="/game-report" component={GameReport} />
        <Route exact path="/not-found" component={NotFound} />
        <Redirect to="not-found" />
      </Switch>
    </QuizContext.Provider>
  )
}

export default App
