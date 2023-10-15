import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) =>{
  const {handleClick, text} = props
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = (props) =>{
  const{text, value, extra} = props
  return(
    <tr>
      <td>{text}: </td>
      <td>{value} {extra}</td>
    </tr>    
      
  )
} 

const Statistics = (props) =>{
  const {good, neutral, bad, all, average, positive} = props

  if(good !== 0 || neutral !== 0 || bad !== 0){
    return(
      <div>
        <h3>Statistics</h3>
        <table>
          <tbody>             
            <StatisticLine text="Good" value={good}/>
            <StatisticLine text="Neutral" value={neutral}/>
            <StatisticLine text="Bad" value={bad}/>
            <StatisticLine text="All" value={all}/>      
            <StatisticLine text="Average" value={average/all}/>                                  
            <StatisticLine text="Positive" value={positive/all} extra="%"/>           
          </tbody>          
        </table>
      </div>    
    )
  }else{
    return(
      <p>No feedback given</p>
    )
  }
  
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    setGood(good+1)
    setAll(all+1)
    setAverage(average+1)
    setPositive(positive+1)
  }

  const handleNeutral = () =>{
    setNeutral(neutral+1)
    setAll(all+1)
  }

  const handleBad = () =>{
    setBad(bad+1)
    setAll(all+1)
    setAverage(average-1)
  }

  return (
    <div>
      <h3>Give Feedback</h3>
      <Button handleClick={handleGood} text = "Good"/>
      <Button handleClick={handleNeutral} text = "Neutral"/>
      <Button handleClick={handleBad} text = "Bad"/>
      <Statistics good = {good} bad = {bad} neutral = {neutral} all = {all} average = {average} positive = {positive}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)