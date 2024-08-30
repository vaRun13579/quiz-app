import React from 'react'

export default React.createContext({
  unattemptedQestions: [],
  correctAnswered: {},
  totalQuestions: 0,
  setCorrectAnswer: () => {},
  setTotalQuestions: () => {},
  setUnattemptedQuestions: () => {},
  clearAllData: () => {},
})
