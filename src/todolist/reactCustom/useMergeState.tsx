import {useState} from "react";
import { listType } from "../../model";
interface props {
    total?: number,
    loading?: false,
    current?: number
}
const useMergeState:any = (initialState:props = {}) => {
    const [value, setValue] = useState(initialState);
  
    const mergeState = (newState: any) => {
      if (typeof newState === 'function') newState = newState(value);
      setValue({ ...value, ...newState });
    };
  
    return [value, mergeState];
  };

export default useMergeState