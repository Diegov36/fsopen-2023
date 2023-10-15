import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = (props) =>{
  const {text, points, selected} = props
  return(
    <div>
      <p>{text} </p>
      <p>Has {points[selected]} votes</p>      
    </div>
  )
}

const MostVotedAnecdote = (props) => {
  const {anecdotes, votedAnecdote, points} = props
  if(votedAnecdote !== null){
    return(
      <>
        <h1>Most voted anecdote</h1>
        <Anecdote text = {anecdotes[votedAnecdote]} points = {points} selected = {votedAnecdote}/>
      </>      
    )
  }
  return(
    <h1>There is no voted anecdote</h1>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points,setPoints] = useState(Array(6).fill(0))  
  const [mostVotedAnecdote, setMostVotedAnectdote] = useState(null)

  const getMostVotedAnecdote = (points) =>{
    const pointArray = [...points]    
    let major = 0
    let majorIndex = 0
    pointArray.forEach((element, index) => {
      if(element > major){
        major = element
        majorIndex = index
      }
    });    
    return majorIndex
  }

  const voteUp = () =>{    
    const aux = [...points] 
    aux[selected] +=1
    setMostVotedAnectdote(getMostVotedAnecdote(aux))
    setPoints(aux)        
  }

  const getNewNumber = () =>{    
    const randomNumber = Math.floor(Math.random() * 6)
    setSelected(randomNumber)    
  }

  return (
    <>
      <Anecdote text = {props.anecdotes[selected]} points = {points} selected = {selected}/>
      <button onClick={voteUp}>Vote up</button>
      <button onClick={getNewNumber}>Next Anecdote</button>      
      <MostVotedAnecdote anecdotes = {props.anecdotes} points = {points} votedAnecdote = {mostVotedAnecdote}/>      
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)