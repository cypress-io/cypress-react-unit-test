/// <reference types="cypress" />
import React, { useState } from 'react'

// https://reactjs.org/docs/hooks-state.html
function Example () {
  console.log('here')
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}

it('loads component with state hook', () => {
  cy.mount(<Example />)
})
