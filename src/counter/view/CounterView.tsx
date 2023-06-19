import React from "react";
import { useState } from "react";
import "../style/style.scss";
import Decrement from "../component/Decrement";
import Increment from "../component/Increment";

const CounterView:React.FC = () => {
    const [count, setCount] = useState<number>(0);
    const handleIncrement = () => setCount(preCount => preCount + 1)
    const handleDecrement = () => setCount(preCount => preCount - 1)
    return (
        <div className='counter-view'>
            <h1>Counter App</h1>
            <h1>{count}</h1>
            <Increment onClick={handleIncrement} />
            <Decrement onClick={handleDecrement} />
        </div>
    )
}

// class CounterView extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { counter: 0 };
//   }

//   handleDecrement = () => this.setState({ counter: this.state.counter - 1 });
//   handleIncrement = () => this.setState({ counter: this.state.counter + 1 });
//   handleReset = () => {
//     this.setState({ counter: 0 });
//   };

//   render() {
//     return (
//       <div className="counter-view">
//         <h1>Counter App</h1>
//         <Display counter={this.state.counter} />
//         <button onClick={this.handleDecrement}>Decrement</button>
//         <button onClick={this.handleIncrement}>Increment</button>
//         <br />
//         <button onClick={this.handleReset}>Increment</button>
//       </div>
//     );
//   }
// }

// class Display extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log(props);
//   }

//   render() {
//     return <h1>{this.props.counter}</h1>;
//   }
// }

export default CounterView;
