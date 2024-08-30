import React, {useContext, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import QuizContext from '../../context/QuizContext'
import './index.css'

const OptionsItem = withRouter(props => {
  // console.log(props)
  const {
    type,
    item,
    optionId,
    optionNo,
    booleanType,
    selectOption,
    location,
  } = props
  const {pathname} = location
  const fItem = (() => ({
    id: item.id,
    text: item.text,
    imageUrl: item.image_url,
    isCorrect: item.is_correct,
  }))()
  const {id, text, imageUrl} = fItem
  let {isCorrect} = fItem
  const {correctAnswered, setCorrectAnswer} = useContext(QuizContext)

  isCorrect = isCorrect === 'true'
  const selected = optionId !== 'Not Selected'
  const isSame = id === optionId

  const onClickOption = () => {
    if (selected) return
    selectOption(id)
  }

  let defaultClass = 'default-item'

  if (selected) {
    if (isCorrect) {
      defaultClass = 'default-item correct-option'
    } else if (isSame) {
      defaultClass = 'default-item wrong-option'
    }
  }

  useEffect(() => {
    if (
      pathname === '/quiz-game' &&
      isSame &&
      isCorrect &&
      correctAnswered[id] === undefined
    ) {
      setCorrectAnswer(id)
    }
  }, [isSame, selected])

  // console.log(isSame)

  const renderContent = () => {
    if (type === 'DEFAULT') {
      return (
        <div className="option-wrapper">
          <button
            type="button"
            onClick={onClickOption}
            className={defaultClass}
          >
            <li className="default-list-item">
              {!booleanType && optionNo}
              {'.  '}
              {text}
            </li>
          </button>
          {selected && isCorrect && (
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
              alt="correct checked circle"
              className="correct-image"
            />
          )}
          {selected && !isCorrect && isSame && (
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
              alt="incorrect close circle"
              className="wrong-image"
            />
          )}
        </div>
      )
    }

    if (type === 'IMAGE') {
      return (
        <div className="option-wrapper">
          <li onClick={onClickOption} className="image-list-item">
            <img src={imageUrl} alt="option" className="option-image" />
          </li>
          {selected && isCorrect && (
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
              alt="correct checked circle"
              className="correct-image"
            />
          )}
          {selected && !isCorrect && isSame && (
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
              alt="incorrect close circle"
              className="wrong-image"
            />
          )}
        </div>
      )
    }

    if (type === 'SINGLE_SELECT') {
      return (
        <div className="option-wrapper">
          <li className="single-list-item">
            <input
              id={id}
              type="radio"
              name="single-option"
              value={text}
              checked={isSame}
              onChange={onClickOption}
              // disabled={selected}
            />
            <label htmlFor={id} className="option-label">
              {text}
            </label>
          </li>
          {selected && isCorrect && (
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
              alt="correct checked circle"
              className="correct-image"
            />
          )}
          {selected && !isCorrect && isSame && (
            <img
              src="https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png"
              alt="incorrect close circle"
              className="wrong-image"
            />
          )}
        </div>
      )
    }

    return <li>Something went wrong</li>
  }

  return renderContent()
})

export default OptionsItem
