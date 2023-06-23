import { useRef, useContext, useEffect, useState } from "react";
import { Button, Card, message, Space, Input, Tag, Skeleton } from "antd";
import axios from "axios";
import { PlusCircleOutlined } from "@ant-design/icons";
import dayjs, {type  Dayjs} from "dayjs";
import React from "react";

import "../style/style.scss";
import { contextTodo } from "../component/ContextTodo";
import ModalForm from "../component/ModalForm";
import TableItem from "../component/Table";
import { listType } from "../../model";
 import { v4 as uuidv4 } from "uuid"


interface RefObject {
  setOpenForward: (a: boolean, b:listType | null) => void
}
type setListType = React.Dispatch<React.SetStateAction<listType[]>>

const TodolistView:React.FC = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const { setList} = useContext<{list: listType[], setList: setListType}>(contextTodo);
  // const [data, setData] = useMergeState({total: 0, loading: true});
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true)
  const refModal = useRef<RefObject>(null);
  const [current, setCurrent] = useState<number>(1)

  // Gọi API sau khi component đưa elements vào DOM
  useEffect(() => {
   const idSetTimeout = setTimeout(() => {
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

  const handleEditItem = (record:listType) => {
      refModal?.current?.setOpenForward(true, record);
  };

  const handleModalFormCreate = () => {
    refModal?.current?.setOpenForward(true, null);
  };

  const getListApi = async (page: number) => {
   await axios
    .get(
      `http://localhost:3000/course?_start=0&_page=${page}&_limit=10`
    )
    .then((res) => {
        setTotal(res.headers["x-total-count"]);
        const data:listType[] = res.data.map((item:listType, index:number) => {
        const startDate: any = dayjs(item.startDate, "DD/MM/YYYY");
        const endDate: any = dayjs(item.endDate, "DD/MM/YYYY");
        return {
          ...item,
          key: uuidv4(),
          job: <Tag color={item.isComplete ? "blue": "red"}>{item.job}</Tag>,
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
      setCurrent(page);
      setLoading(false)
    });
  }
      

  const handleSearchByJob = (value = "") => {
    axios
      .get(`http://localhost:3000/course?_start=0&job=${value}`)
      .then((res) => {
        const data = res.data.map((item:listType) => {
          const startDate:any = dayjs(item.startDate, "DD/MM/YYYY");
          const endDate:any = dayjs(item.endDate, "DD/MM/YYYY");
          return {
            ...item,
            key: uuidv4(),
            job: <Tag color={item.isComplete ? "blue": "red"}>{item.job}</Tag>,
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
        setTotal(data.length)
        setList(data);
      });
  };
  if(loading) return <Skeleton></Skeleton> 
console.log('view')
  return (
    <div className="todolist-view">
      {contextHolder}
     
      <div className="todolist-container">
        <div className="todolist-content">
          <Space direction="vertical" style={{ display: "flex" }}>
            <Input.Search
              placeholder="Tìm kiếm..."
              enterButton
              style={{ width: "300px" }}
              onSearch={(e) => handleSearchByJob(e)}
            />
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
              <TableItem
                getListApi = {getListApi}
                // handleDeleteItem={handleDeleteItem}
                handleEditItem={handleEditItem}
                messages={messages}
                total={total}
                loading={loading}
                setLoading = {setLoading}
                current={current}
                setCurrent={setCurrent}
              />
            </Card>
            <ModalForm
              getListApi = {getListApi}
              ref={refModal}
              total={total}
              setTotal={setTotal}
              messages={messages}
              setLoading={setLoading}
            />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default TodolistView;
