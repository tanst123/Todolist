import { useRef, useContext, useEffect, useState } from "react";
import { Button, Card, message, Space, Input, Tag } from "antd";
import axios from "axios";
import { PlusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import React from "react";

import "../style/style.scss";
// import Form from "../form/FormCreate";
// import ListItem from "../component/List";
import { contextTodo } from "../component/ContextTodo";
import ModalForm from "../component/ModalForm";
import TableItem from "../component/Table";
import { listType } from "../../model";
 import { v4 as uuidv4 } from "uuid"
import ApiUtil from "../utils/ApiUtil";

interface RefObject {
  setOpenForward: (a: boolean, b:listType | null) => void
}
type setListType = React.Dispatch<React.SetStateAction<listType[]>>
const TodolistView:React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [list, setList] = useContext<[listType[], setListType ]>(contextTodo);
  const [total, setTotal] = useState<number>(0);
  const refModal = useRef<RefObject>(null);
  const [loading, setLoading] = useState<boolean>(false)
  
  useEffect(() => {
   const idSetTimeout = setTimeout(() => {
      setLoading(true)
      getListApi(1)
    }, 500)
    return () => clearTimeout(idSetTimeout)
  }, [] )

  const messages = (type:string | any, descripton: string) => {
    messageApi.open({
      type: type,
      content: descripton,
    });
  };

  const handleDeleteItem = (record:listType) => {
    const item = list.find((item) => item?.key === record.key);
      axios.delete(`http://localhost:3000/course/${item?.id}`);
    const data = list.filter((item) => item.key !== record.key);
    const totalCurrent = total - 1;
    setTotal(total - 1);
    setList(data);
    setTimeout(() => {
      setLoading(true)
      getListApi(Math.ceil(totalCurrent/10))
    }, 100)
    
    messages("warning","Todo removed!");
   
  };

  const handleEditItem = (record:listType) => {
      refModal?.current?.setOpenForward(true, record);
  };

  const handleModalFormCreate = () => {
    refModal?.current?.setOpenForward(true, null);
  };

  const getListApi = (page: number) => {
    axios
    .get(
      `http://localhost:3000/course?_start=0&_page=${page}&_limit=10`
    )
    .then((res) => {
      setTotal(res.headers["x-total-count"]);
      const data = res.data.map((item:listType, index:number) => {
        const startDate:any = dayjs(item.startDate, "DD/MM/YYYY");
        const endDate:any = dayjs(item.endDate, "DD/MM/YYYY");
        return {
          ...item,
          key: uuidv4(),
          date: [startDate, endDate],
          startDate:
            (startDate.$D < 10 ? "0" + startDate.$D : startDate.$D) +
            "/" +
            (+startDate.$M + 1 < 10
              ? "0" + (+startDate.$M + 1)
              : +startDate.$M + 1) +
            "/" +
            startDate.$y,
          endDate:
            (endDate.$D < 10 ? "0" + endDate.$D : endDate.$D) +
            "/" +
            (+endDate.$M + 1 < 10
              ? "0" + (+endDate.$M + 1)
              : +endDate.$M + 1) +
            "/" +
            endDate.$y,
        };
      });
      setList(data);
      setLoading(false)
    });
  }
  
  const handleSearchByJob = (value = "") => {
    axios
      .get(`http://localhost:3000/course?_start=0&job=${value}`)
      .then((res) => {
        setTotal(res.headers["x-total-count"]);
        const data = res.data.map((item:listType) => {
          const startDate:any = dayjs(item.startDate, "DD/MM/YYYY");
          const endDate:any = dayjs(item.endDate, "DD/MM/YYYY");
          return {
            ...item,
            key: uuidv4(),
            job: <Tag>{item.job}</Tag>,
            date: [startDate, endDate],
            startDate:
              (startDate.$D < 10 ? "0" + startDate.$D : startDate.$D) +
              "/" +
              (+startDate.$M + 1 < 10
                ? "0" + (+startDate.$M + 1)
                : +startDate.$M + 1) +
              "/" +
              startDate.$y,
            endDate:
              (endDate.$D < 10 ? "0" + endDate.$D : endDate.$D) +
              "/" +
              (+endDate.$M + 1 < 10
                ? "0" + (+endDate.$M + 1)
                : +endDate.$M + 1) +
              "/" +
              endDate.$y,
          };
        });
        setList(data);
      });
  };
  return (
    <div className="todolist-view">
      {contextHolder}
      {/* <div className="todolist-header">
        <h4>Add Todo</h4>
        <p>To add a todo, just fill the form below and click in add todo.</p>
      </div> */}
      <div className="todolist-container">
        <div className="todolist-content">
          <Space direction="vertical" style={{ display: "flex" }}>
            {/* <Card title="Create a new todo">
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                refButton={refButton}
              />
            </Card> */}
            <Input.Search
              placeholder="Tìm kiếm..."
              enterButton
              style={{ width: "300px" }}
              onSearch={(e) => handleSearchByJob(e)}
            ></Input.Search>
            <Card
              title="Todo List"
              extra={
                <Button
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  onClick={handleModalFormCreate}
                >
                  Add Todo
                </Button>
              }
            >
              {/* <ListItem 
                      list={list}
                      handleDeleteItem = {handleDeleteItem}
                      messages = {messages}
                  /> */}
              <TableItem
                getListApi = {getListApi}
                handleDeleteItem={handleDeleteItem}
                handleEditItem={handleEditItem}
                messages={messages}
                total={total}
                loading={loading}
                setLoading = {setLoading}
              />
            </Card>
            <ModalForm
              getListApi = {getListApi}
              ref={refModal}
              total={total}
              setTotal={setTotal}
              messages={messages}
            />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default TodolistView;
