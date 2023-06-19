import { createContext, useState } from "react";
import React from 'react'
import { listType, setListType } from "../../model";

interface Props{
  children: React.ReactNode
}
export const contextTodo = createContext<[listType[], setListType]| any>([]);
const ProviderTodo= ({ children }: Props) => {
  const [list, setList] = useState<[listType[], setListType]>();
  const value = [list, setList];

  return <contextTodo.Provider value={value}>{children}</contextTodo.Provider>;
};


export default ProviderTodo;
