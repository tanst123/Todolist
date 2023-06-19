import { ADD_TO_DO_INPUT, SET_TO_DO_INPUT } from "./constants";

interface stateType{
    todos: string[],
    todoInput: string
}
const initState: stateType = {
    todos: [],
    todoInput: ''
}

const reducer = (state: stateType, action: {type: string, payload: string}) => {
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