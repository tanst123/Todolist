import React from 'react'
export interface listType {
    id?: number,
    key?: string | Function,
    job?: string | React.JSX.Element,
    startDate?: string,
    endDate?:string,
    note?: string,
    date?: string | any
  }
  export interface setListType {
    setList: React.Dispatch<React.SetStateAction<listType[]>>
  }