import { createContext, useState } from "react";
import React from 'react'
import { listType, setListType } from "../../model";

interface Props{
  children: React.ReactNode
}
export const contextTodo = createContext<[listType[], setListType]| any>([]);
const ProviderTodo= ({ children }: Props) => {
  const [list, setList] = useState<[listType[], setListType]>();
  return <contextTodo.Provider value={{list, setList}}>{children}</contextTodo.Provider>;
};



export default ProviderTodo;
