import React from "react";

const errorMessage = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    margin: 10
    }

const successMessage = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    margin: 10
}



const Message = ({ message }) => {
  if (message === null) {
    return null;
  }
  if(message.type === 'error'){
    return <div style={errorMessage}>{message.text}</div>;
  }
  if(message.type === 'success'){
    return <div style={successMessage}>{message.text}</div>;
  }
  return null;
}

export default Message;