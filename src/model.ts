import React from 'react'
import { type Dayjs } from 'dayjs';
export interface listType {
    id?: number,
    key?: string | Function,
    job?: string | React.JSX.Element | any,
    startDate?: string,
    endDate?:string,
    note?: string,
    date?: [Dayjs, Dayjs],
    isComplete: boolean
  }
  export interface setListType {
    setList: React.Dispatch<React.SetStateAction<listType[]>>
  }