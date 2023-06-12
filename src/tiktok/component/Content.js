import { useContext } from "react";
import { ThemeContext} from "./ThemeContext.js"


const Content = () =>{
    const context = useContext(ThemeContext)
    return (
        <>
            <h1 className={context.theme}>Hello Word</h1>
        </>
      );
}

export default Content;