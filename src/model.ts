import React from 'react'
export interface listType {
    id?: number,
    key?: string | Function,
    job?: string | React.JSX.Element | any,
    startDate?: string,
    endDate?:string,
    note?: string,
    date?: string | any,
    isComplete: boolean
  }
  export interface setListType {
    setList: React.Dispatch<React.SetStateAction<listType[]>>
  }