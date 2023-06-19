import { ADD_TO_DO_INPUT, SET_TO_DO_INPUT } from "./constants"

export const setToDoInput= (payload:string) => {
    return {
        type: SET_TO_DO_INPUT,
        payload
    }
}


export const addToDoInput = (payload:string) => {
    return {
        type:ADD_TO_DO_INPUT,
        payload
    }
}
