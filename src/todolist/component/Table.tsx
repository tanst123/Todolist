import "../style/style.scss"
import React, { useEffect, useState }  from "react";
import { Button, Table, Popconfirm, Switch, Space, Tag } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import { useContext } from "react";
import { contextTodo } from "./ContextTodo";
import { listType } from "../../model";
import ApiUtil from "../utils/ApiUtil";
import _ from "lodash"

interface props {
  handleDeleteItem: (record:listType, current: number,setCurrent: React.Dispatch<React.SetStateAction<number>>) => void,
  handleEditItem: (record:listType) => void,
  messages:(type:string | any, descripton: string) => void,
  getListApi: (a: number) => void,
  total: number,
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
}
type setListType = React.Dispatch<React.SetStateAction<listType[]>>


const TableItem = ({ handleDeleteItem, handleEditItem, messages, getListApi,total, loading, setLoading}:props) => {
  const {list, setList} = useContext<{list: listType[], setList: setListType}>(contextTodo);
  const [current, setCurrent] = useState<number>(1)

  
  useEffect(() => {
    if(list?.length < 10) {
      setCurrent(Math.ceil(total/10))
    }
  }, [list?.length])

  const handleChangeSwitch = async (checked:boolean, record:listType) => {
    if(record.id !== undefined) {
      const newList:listType[] = _.map(list, (item) => {
         if(record.id === item.id) {
           item.isComplete = checked
           item.job = <Tag color={checked?"blue":"red"}>{record.job.props.children}</Tag>
         }
         return item
      })
     setList(newList)  
      await ApiUtil.putApi("http://localhost:3000/course",record.id, {...record, job: record.job.props.children, isComplete: checked})
    }
  messages("info", "Todo state updated!");
};

  const columns = [
    {
      title: "Job",
      dataIndex: "job",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Note",
      dataIndex: "note",
    },
    {
      title: "Edit",
      dataIndex: "edit",
      render: (_:string, record:listType) => {
        return (
          <Space>
            <Button onClick={() => handleEditItem(record)}>Edit</Button>
            <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(checked: boolean) => {
                  return handleChangeSwitch(checked, record)
              }}
              checked={record.isComplete}
            />
          </Space>
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "delete",
      render: (_:string, record: listType) => {
        return (
          <Popconfirm
            placement="top"
            title="Are you sure you want to delete?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDeleteItem(record, current, setCurrent)}
          >
            <Button type="primary" danger>
              <CloseOutlined />
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

 
 
  
  return (
    <Table
      loading={loading}
      pagination={{
        pageSize: 10,
        current: current,
        total: total,
        onChange: (page) => {
          setLoading(true)
          setTimeout(() => {
            getListApi(page)
            setCurrent(page)
          }, 100)
        },
      }}
      columns={columns}
      dataSource={list}
    />
  );
};
export default TableItem;
