import {memo} from "react"
function Content({onIncrease}) {
    console.log("re...")
    return (
        <>
        <h1>Hello Anh em</h1>
        <button onClick={onIncrease}>Click me!</button>
        </>
    )
}
export default memo(Content)