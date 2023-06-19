import { Form, Input, Button, DatePicker, Space } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useContext, useRef } from "react";
import { contextTodo } from "../component/ContextTodo";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { listType } from "../../model";
import React from "react";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
// import ApiUtil from "../utils/ApiUtil";
const dateFormat = "DD/MM/YYYY";
interface props {
  messages: (type:string | any, descripton: string) => void,
  total: number,
  setTotal: React.Dispatch<React.SetStateAction<number>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  getListApi: (a: number) => void,
}

interface eventType extends listType {
  date: [Dayjs, Dayjs] | any
}
type setListType = React.Dispatch<React.SetStateAction<listType[]>>
export interface RefObject {
  RefObject: () => void,
}
const FormCreate:React.FC<props> = ({ messages, total, setTotal, setOpen, getListApi }) => {
  const { RangePicker } = DatePicker;
  const [list, setList] = useContext<[listType[], setListType]>(contextTodo);
  const refButton = useRef<HTMLButtonElement>(null);
  const [form] = Form.useForm()

  const onFinish = (e:eventType) => {
  
      const job = {
        key: uuidv4(),
        job: e.job,
        startDate:
          (e.date[0].$D < 10 ? "0" + e.date[0].$D : e.date[0].$D) +
          "/" +
          (+e.date[0].$M + 1 < 10
            ? "0" + (+e.date[0].$M + 1)
            : +e.date[0].$M + 1) +
          "/" +
          e.date[0].$y,
        endDate:
          (e.date[1].$D < 10 ? "0" + e.date[1].$D : e.date[1].$D) +
          "/" +
          (+e.date[1].$M + 1 < 11
            ? "0" + (+e.date[1].$M + 1)
            : +e.date[1].$M + 1) +
          "/" +
          e.date[1].$y,
        note: e.note,
        date: e.date,
      };
    axios.post("http://localhost:3000/course", job);
    setTotal(+total + 1);
    setList(list)
    messages("success", "Todo added!");
    if(refButton.current !== null)
    refButton.current.type = "reset";
    setTimeout(() => {
    if(refButton.current !== null)
      refButton.current.type = "submit";
    }, 100);
    setOpen(false)
    form.setFieldsValue(null)
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      form={form}
      className="form-ant-input"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Form.Item
          className="form-item-wrap"
          name="job"
          rules={[{ required: true, message: "The field is required" }]}
          label="Job Text: "
        >
          <Input
            className="input-ant-job"
            placeholder="What needs to be done?"
          />
        </Form.Item>

        <Form.Item
          className="form-item-wrap"
          label="RangePicker: "
          name="date"
          rules={[{ required: true, message: "The field is required" }]}
        >
          <RangePicker format={dateFormat} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item className="form-item-wrap" label="Note: " name="note">
          <Input />
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "center" }}>
          <Button
            ref={refButton}
            type="primary"
            htmlType="submit"
            icon={<PlusCircleOutlined />}
          >
            Add todo
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};

export default FormCreate;
