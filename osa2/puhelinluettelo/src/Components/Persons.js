import React from 'react'



const Persons = (props) => {

  
    return (
<ul>
{props.persons.filter(person => person.name.toLowerCase().includes(props.newFiltered.toLowerCase())).map(person =>
  <li key={props.persons.id}>
    {person.name}   {person.number}      <button onClick={() => props.deletePerson(person.name,person.id)}>delete</button>
  </li>
  )}
  </ul>
    ) 
      }

      export default Persons 