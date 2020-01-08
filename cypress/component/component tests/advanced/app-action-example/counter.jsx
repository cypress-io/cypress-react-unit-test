import React from 'react'

export class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }

    if (window.Cypress) {
      // if this component is mounted from inside Cypress Test Runner
      // then expose the reference to this instance
      // to allow controlling it from tests
      window.counter = this
    }
  }

  click = () => {
    this.setState({
      count: this.state.count + 1,
    })
  }

  render() {
    return <p onClick={this.click}>count: {this.state.count}</p>
  }
}
