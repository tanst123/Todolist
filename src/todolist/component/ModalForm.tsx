import { Modal, Skeleton } from "antd";
import { useState, forwardRef, useImperativeHandle } from "react";
import React from 'react'
import FormEdit from "../form/FormEdit";
import FormCreate from "../form/FormCreate";
import { listType } from "../../model";
interface props {
  messages: (type:string | any, descripton: string) => void,
  total: number,
  setTotal: React.Dispatch<React.SetStateAction<number>>,
  getListApi: (a: number, setCurrent?: any) => void,
  setLoading:  React.Dispatch<React.SetStateAction<boolean>>
}

export interface setOpen {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
} 
const ModalForm= forwardRef(({ messages, total, setTotal, getListApi, setLoading }:props, ref) => {
  const [open, setOpen] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<listType | null>(null);

  useImperativeHandle(ref, () => ({
    setOpenForward: (value:boolean, record:listType|any) => {
      setOpen(value);
      record === null
      ? setInitialValues(null) 
      : setInitialValues({ ...record, job: record.job.props.children});
    },
  }));
  const handleOk = () => {};
  const handleCancel = () => {
    setOpen(false);
  };

 if(open === false) return 
  return (
    <Modal open={open} onOk={handleOk} onCancel={handleCancel} footer={null}>
      {initialValues === null ? (
        <FormCreate
          setOpen={setOpen}
          total={total}
          setTotal={setTotal}
          messages={messages}
          getListApi = {getListApi}
          setLoading={setLoading}
        />
      ) : (
        <FormEdit
          initialValues={initialValues}
          setOpen={setOpen}
          messages={messages}
        />
      )}
    </Modal>
  );
});

export default ModalForm;
