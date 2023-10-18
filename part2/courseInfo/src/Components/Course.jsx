const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map((part) => (
      <Part key = {part.id} part={part}/>
    ))}      
  </>

const Course = ({course}) =>{
  const aux = [...course.parts]  
  const exSum = aux.reduce((sum, actual) => sum + actual.exercises, 0)

  return(
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total sum={exSum}/> 
    </div>    
  )
}

export default Course