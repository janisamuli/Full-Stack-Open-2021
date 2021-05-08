import React from 'react'


const Filter = (props) => {
    return (
<div>
  Filter names: <input value ={props.value} onChange={props.onChange} >


  </input>
</div>
    )
}

export default Filter