import { useContext } from "react";
import  Context  from "./Context";

export const ContextStoreHooks = () => {
    const [value, dispatch] = useContext(Context)
    return [value, dispatch]
}

