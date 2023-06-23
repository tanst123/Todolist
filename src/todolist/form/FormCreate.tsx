import { Form, Input, Button, DatePicker, Space, Switch } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { listType } from "../../model";
import React from "react";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import dayjs from 'dayjs';
import ApiUtil from "../utils/ApiUtil";
const dateFormat = "DD/MM/YYYY";
interface props {
  messages: (type:string | any, descripton: string) => void,
  total: number,
  setTotal: React.Dispatch<React.SetStateAction<number>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  getListApi: (a: number) => void,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}


export interface RefObject {
  RefObject: () => void,
}
const FormCreate:React.FC<props> = ({ messages, total, setOpen, getListApi, setLoading }) => {
  const { RangePicker }= DatePicker;
  const [form] = Form.useForm()

  const onFinish = async(e:listType) => {
      const job:listType = {
        key: uuidv4(),
        isComplete: e.isComplete,
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
        note: e.note || "",
        date: e.date,
      };
       
    setLoading(true)
    await ApiUtil.postApi("http://localhost:3000/course", job);
    getListApi(Math.ceil((+total + 1)/10))

    messages("success", "Todo added!");
 
    form.resetFields(undefined)
    setOpen(false)
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log("Failed:", errorInfo);
  };
  
  return (
    <Form
      form={form}
      className="form-ant-input"
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
          <Input placeholder="Note for you...." />
        </Form.Item>
        <Form.Item
          className="form-item-wrap"
          label="Switch: "
          name="isComplete"
        >
          <Switch
               checkedChildren={<CheckOutlined />}
               unCheckedChildren={<CloseOutlined />}
          />
        </Form.Item>
        <Form.Item style={{ display: "flex", justifyContent: "center" }}>
          <Button
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
