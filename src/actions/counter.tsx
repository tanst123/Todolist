export const increment = (payload: number) => {
    return {
        type: "INCREMENT",
        payload: payload
    }
}
export const decrement = (payload: number) => {
    return {
        type: "DECREMENT",
        payload: payload
    }
}