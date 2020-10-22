import React from 'react'

export class Component extends React.Component {
  constructor(props) {
    super(props)
    console.log(
      'set window.counter to this component in window',
      window.location.pathname,
    )
    window.component = this
    // save the reference to the window object
    // as "seen" by the component
    window.componentsWindow = window
  }

  render() {
    return <p>component</p>
  }
}
