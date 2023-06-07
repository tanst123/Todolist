import { useState } from 'react';
import '../style/style.scss'
import Decrement from '../component/Decrement';
import Increment from '../component/Increment';

const CounterView = () => {
    const [count, setCount] = useState(0);
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

export default CounterView;