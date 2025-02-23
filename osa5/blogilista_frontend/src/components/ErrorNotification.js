import React from 'react'

const ErrorNotification = ({ message }) => {
  const errorNotificationStyle ={
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10 }
  if(message === null ) {
    return null
  }

  return (

    <div style={errorNotificationStyle} className= "error-notification">
      {message}
    </div>
  )
}

export default ErrorNotification