import React from 'react'

const Clicker = ({ click }) => (
  <div>
    <button onClick={click}>Click me</button>
  </div>
)

export default Clicker

// export class Clicker extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 0
//     };
//   }

//   click = () => {
//     this.setState({
//       count: this.state.count + 1
//     });
//   };

//   render() {
//     return <p onClick={this.click}>count: {this.state.count}</p>;
//   }
// }
