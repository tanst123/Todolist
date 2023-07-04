import React from "react";
// import { ContextStoreHooks } from "../store";
// import { actions } from "../store";
import "../style/style.scss";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { increment, decrement } from "../../reducers/counterSlice";
import { AppDispacth, RootState } from "../..";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch:() => AppDispacth = useDispatch;


// interface props {
//   todos: string[],
//   todoInput: string,
//   dispatch:  React.Dispatch<{
//       type: string;
//       payload: string;
//   }>
// }
const NotFoundView:React.FC = () => {
//   const [state, dispatch] = ContextStoreHooks();

//   const handleAddToInput = () => {
//     dispatch(actions.addToDoInput(state.todoInput));
//   };
//  const counterReducer=(state:{value: number}={value: 0}, action:{type: string}) => {
//       switch(action.type) {
//         case 'counter/incremented': return {value: state.value + 1}
//         case 'counter/decremented':return {value: state.value - 1}
//         default: return state
//       }
//  }

 const count = useAppSelector((state) => state.counter.value)
 const dispatch = useAppDispatch()
  return (
    <div className="notfound-view">
           <h1>{count}</h1>
           <button onClick={() => dispatch(increment(5)) }>Increment</button>
           <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
    // <div className="notfound-view">
    //   <input
    //     value={state.todoInput}
    //     onChange={(e) => dispatch(actions.setToDoInput(e.target.value))}
    //   />
    //   <button onClick={handleAddToInput}>Add</button>
    //   <ul>
    //     {state.todos.map((todo:string, index: number) => (
    //       <li key={index}>{todo}</li>
    //     ))}
    //   </ul>


    // </div>
    
    
  );
};

export default NotFoundView;
