import { ADD_TO_DO_INPUT, SET_TO_DO_INPUT } from "./constants";

const initState = {
    todos: [],
    todoInput: ''
}

const reducer = (state, action) => {
    switch(action.type){
        case SET_TO_DO_INPUT: 
            return {
                ...state,
                todoInput: action.payload
            }
        case ADD_TO_DO_INPUT:
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        default:
            throw new Error("Invalid action....")
    }
}

export {initState} 
export default reducer;