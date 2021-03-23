import React from 'react'
import ReactDOM from 'react-dom'

/* Harjoitukset 1.1. & 1.2.
const App = () => {

Harjoitukset 1.1. & 1.2.
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
      <div>
        <Header course={course} />
        <Content part1={part1} part2= {part2} part3= {part3} exercises1= {exercises1} exercises2={exercises2} exercises3={exercises3}   />
        <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
      </div>
    )
} */
/* Harjoitus 1.3.
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
    <Header course={course} />
    <Content name ={part1.name} exercises = {part1.exercises}/>
    <Content name ={part2.name} exercises = {part2.exercises}/>
    <Content name ={part3.name} exercises = {part3.exercises}/>
    <Total total = {part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}
*/

/* Harjoitus 1.4.
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
    <Header course={course} />
    <Content parts={parts} />
    <Total parts={parts} />
    </div>
  )
}
*/




const Header = (props) => {
console.log(props)
  return (
  <div>
    <h1>{props.course}</h1>
    </div>
)
}

const Part = (props) => {
 console.log(props)
return (
  <div>

  <p>
    {props.name} {props.exercises}
  </p>

  </div>

)
}

const Content = (props) => {
//  console.log(props)
return (
<div>
  <Part name = {props.parts[0].name} exercises = {props.parts[0].exercises} />
  <Part name = {props.parts[1].name} exercises = {props.parts[1].exercises} />
  <Part name = {props.parts[2].name} exercises = {props.parts[2].exercises} />

  </div>
)
}

const Total = (props) => {
//  console.log()
return (
<div>
<p> Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} </p>
</div>
)

}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </div>
  )
}







ReactDOM.render(<App />, document.getElementById('root'))
