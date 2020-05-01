import React from 'react'
import ReactDOM from 'react-dom'

const App = () => <div>App is here</div>
export default App

// typical React application tries to render the component
// to the default placeholder element
// if the element does not exist, we get an error
// "Target container is not a DOM element."
ReactDOM.render(<App />, document.getElementById('root'))
