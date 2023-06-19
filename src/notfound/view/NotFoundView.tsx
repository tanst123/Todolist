import React from "react";
import { ContextStoreHooks } from "../store";
import { actions } from "../store";
import "../style/style.scss";

interface props {
  todos: string[],
  todoInput: string,
  dispatch:  React.Dispatch<{
      type: string;
      payload: string;
  }>
}
const NotFoundView:React.FC = () => {
  const [state, dispatch] = ContextStoreHooks();

  const handleAddToInput = () => {
    dispatch(actions.addToDoInput(state.todoInput));
  };

  return (
    <div className="notfound-view">
      <input
        value={state.todoInput}
        onChange={(e) => dispatch(actions.setToDoInput(e.target.value))}
      />
      <button onClick={handleAddToInput}>Add</button>
      <ul>
        {state.todos.map((todo:string, index: number) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotFoundView;
