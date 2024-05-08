import { useState } from 'react'
import Button from './components/Button';
import Header from './components/Header';
import Statics from './components/Statics';

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handelGood = () => {
    setGood(good + 1)
  }

  const handelNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handelBad = () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <Header title={"Give feedback"} />
      <Button handleClick={handelGood} text={"good"} />
      <Button handleClick={handelNeutral} text={"neutral"} />
      <Button handleClick={handelBad} text={"bad"} />
      <Statics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App;
