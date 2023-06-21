import { Form, Input, Button, DatePicker, Space, Tag, Switch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import { useContext, useEffect } from "react";
import { contextTodo } from "../component/ContextTodo";
import _ from "lodash";
import axios from "axios";
import { listType } from "../../model";
import React from "react";
const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";
interface props {
  initialValues: listType,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  messages: (type:string | any, descripton: string) => void
}
type setListType = React.Dispatch<React.SetStateAction<listType[]>>
const FormEdit = ({ initialValues, setOpen, messages }: props) => {
  const {list, setList} = useContext<{list: listType[], setList: setListType}>(contextTodo);
  const [form] = Form.useForm();
  console.log(initialValues)
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);

  const onFinish = (valuesForm:listType) => {

    let idItem;
    let indexItem:number = 0;
    const newList: listType[] = _.map(list, (item:listType, index: number) => {
      if (item.key === initialValues.key) {
        idItem = item.id;
        indexItem = index;
        item.id = initialValues.id
        item.job = valuesForm.job
        item.isComplete = initialValues.isComplete
        item.note = valuesForm.note;
        item.startDate =
          (valuesForm.date[0].$D < 10
            ? "0" + valuesForm.date[0].$D
            : valuesForm.date[0].$D) +
          "/" +
          (+valuesForm.date[0].$M + 1 < 10
            ? "0" + (+valuesForm.date[0].$M + 1)
            : +valuesForm.date[0].$M + 1) +
          "/" +
          valuesForm.date[0].$y;
        item.endDate =
          (valuesForm.date[1].$D < 10
            ? "0" + valuesForm.date[1].$D
            : valuesForm.date[1].$D) +
          "/" +
          (+valuesForm.date[1].$M + 1 < 10
            ? "0" + (+valuesForm.date[1].$M + 1)
            : +valuesForm.date[1].$M + 1) +
          "/" +
          valuesForm.date[1].$y;
        item.date = valuesForm.date;
      }
      return item;
    });
    axios.put(`http://localhost:3000/course/${idItem}`, newList[indexItem]);
    newList[indexItem] = {...newList[indexItem], job: <Tag color={newList[indexItem].isComplete ? "blue":"red"}>{newList[indexItem].job}</Tag>}
    setList(newList)
    setOpen(false);
    messages("success", "Todo modified!");
  };
  const onFinishFailed = () => {};

  return (
    <Form
      form={form}
      className="form-ant-input"
      initialValues={initialValues}
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
        <Form.Item
          className="form-item-wrap"
          wrapperCol={{ offset: 11, span: 24 }}
        >
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};
export default FormEdit;
