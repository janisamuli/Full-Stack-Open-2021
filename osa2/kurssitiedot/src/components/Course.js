import React from 'react';



const Course = ({ course }) => { 
    return (
    <div>
     <Header name={course.name} />
     <Content parts={course.parts} />
     <Total parts={course.parts} />
    </div>
  );
}
const Header = (props) => {

      return (
      <div>
        <h1>{props.name}</h1>
        </div>
    );
    }

    const Content = ({parts}) => (
      
    <div>
           {parts.map((part) => 
           <Part key= {part.id} part= {part} /> 
           )}
    </div>
     );
        
    
    const Part = (props) => {
    return (
      <div>
    
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    
      </div>
    
    )
    }

    const Total = ({parts}) => {

        const total = parts.reduce((returnValue,currentValue) =>  returnValue + currentValue.exercises,0)

        return <b> Total of {total} exercises</b> 
        
    }

    export default Course