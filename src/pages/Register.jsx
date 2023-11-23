import AddForm from 'components/AddForm'
import React from 'react'

export default function Register({items, setItems}) {
  return (
    <div>
        <AddForm items = {items} setItems = {setItems}/>
    </div>
  )
}
