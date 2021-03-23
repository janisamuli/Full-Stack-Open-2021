import React, { useState } from 'react'

const Header = (props) => {
  return <h1> {props.feedback}</h1>
}

const StatisticLine = (props) => {
  return (


   <tr><td> {props.text}</td><td>{props.value}</td></tr>
    
  )
}
const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (

    <table>
      <thead>
        <tr>
    <th><h1>Statistics</h1></th>
    </tr>
    </thead>
      <tbody>
  <StatisticLine text="good" value ={props.good} />
  <StatisticLine text="neutral" value ={props.neutral} />
  <StatisticLine text="bad" value ={props.bad} />
  <StatisticLine text="bad" value ={props.bad} />  
  <StatisticLine text="All" value = {props.all} />  
  <StatisticLine text="Average" value = {props.average} />
  <StatisticLine text="Positive" value = {props.positive} />
  </tbody>
    </table>

   
  )
}

const Button = (props) => {
  const { handleClick, text } = props
  return (
  <button onClick={handleClick}> {text}</button> 
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good + 0*neutral - bad) / all
  const positive = (good) / all * 100 +"%"
  const feedback = 'Give feedback'
 

  const handleGoodClick = () => {
    setGood(good +1)
  }

  const handleNeutralClick =() => {
    setNeutral(neutral +1)
  }

  const handleBadClick = () => {
    setBad(bad+1)
  }

  return (
    
    <div>
    <Header feedback = {feedback} />  

      <Button handleClick = {handleGoodClick} text = "good" />
      <Button handleClick = {handleNeutralClick} text = "neutral" />
      <Button handleClick = {handleBadClick} text = "bad" />
     <Statistics good = {good} neutral = {neutral} bad = {bad} all = {all} average = {average} positive = {positive}/>
  
    </div>
  )
}

export default App