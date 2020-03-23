import React from 'react'
import {
  Button,
  UserAction,
  UserActionButton,
  UserActionInput,
  OnSubmitResponse,
} from '../types'
import { StoreAction } from '../store'

interface Data {
  [key: string]: any
}

const isButtonAction = (action: UserAction): action is UserActionButton =>
  action.inputType === 'buttons'

const isInputAction = (action: UserAction): action is UserActionInput =>
  action.inputType === 'input'

const onClick = (
  button: Button,
  data: Data,
  onSubmit: (
    button: Button,
    data: any,
    setData: (property: string, value: any) => void,
  ) => OnSubmitResponse,
  storeAction: StoreAction,
) => () =>
  onSubmit(button, data, storeAction.setData).then(storeAction.userAnswered)

interface ButtonsProps {
  data: Data
  storeAction: StoreAction
  userAction: UserActionButton
}

const Buttons = ({ data, storeAction, userAction }: ButtonsProps) => {
  const { buttons, onSubmit } = userAction
  return (
    <React.Fragment>
      {buttons.map((button, index) => (
        <button
          className="user-action-button"
          key={index}
          onClick={onClick(button, data, onSubmit, storeAction)}
          type="button"
        >
          {button.label}
        </button>
      ))}
    </React.Fragment>
  )
}

const handleSubmit = (
  data: Data,
  onSubmit: (
    userInput: string,
    data: any,
    setData: (property: string, value: any) => void,
  ) => OnSubmitResponse,
  storeAction: StoreAction,
) => (e: any) => {
  e.preventDefault()
  return onSubmit(
    e.target.elements.userinput.value,
    data,
    storeAction.setData,
  ).then(submited => {
    storeAction.userAnswered(submited)
  })
}

interface InputProps {
  data: Data
  storeAction: StoreAction
  userAction: UserActionInput
}

const Input = ({ data, storeAction, userAction }: InputProps) => {
  const { placeholder, type, onSubmit } = userAction
  return (
    <div className="user-action">
      <form onSubmit={handleSubmit(data, onSubmit, storeAction)}>
        <input
          className="user-action-input"
          name="userinput"
          placeholder={placeholder || ''}
          type={type || 'text'}
        />
        <button
          className="user-action-submit"
          type="submit"
          aria-label="Submit"
        >
          ⏎
        </button>
      </form>
    </div>
  )
}

interface Props {
  data: Data
  storeAction: StoreAction
  userAction: UserAction
}

export default ({ data, storeAction, userAction }: Props) => {
  if (isButtonAction(userAction)) {
    return (
      <Buttons data={data} storeAction={storeAction} userAction={userAction} />
    )
  }
  if (isInputAction(userAction)) {
    return (
      <Input data={data} storeAction={storeAction} userAction={userAction} />
    )
  }
  return null
}
