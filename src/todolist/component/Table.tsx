import "../style/style.scss"
import React, { useEffect, useState }  from "react";
import { Button, Table, Popconfirm, Switch, Space, Tag, Skeleton } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import axios from "axios";
import { useContext } from "react";
import { contextTodo } from "./ContextTodo";
import { listType } from "../../model";
import ApiUtil from "../utils/ApiUtil";
import _ from "lodash"



interface props {
  // handleDeleteItem: (record:listType, current: number,setCurrent: React.Dispatch<React.SetStateAction<number>>) => void,
  handleEditItem: (record:listType) => void,
  messages:(type:string | any, descripton: string) => void,
  getListApi: (a: number, setCurrent?: any) => void,
  total: number,
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  current: number,
  setCurrent: React.Dispatch<React.SetStateAction<number>>
}
type setListType = React.Dispatch<React.SetStateAction<listType[]>>


const TableItem = ( {handleEditItem, messages, getListApi,total, loading, setLoading, current, setCurrent}:props) => {
  const {list, setList} = useContext<{list: listType[], setList: setListType}>(contextTodo);
  
  const handleDeleteItem = async (record:listType) => {
    setLoading(true)
    await axios.delete(`http://localhost:3000/course/${record?.id}`);
       if((current - 1)* 10 === total - 1 && current !== 1){
      getListApi(current - 1)
      setCurrent(current - 1)
    }
    else getListApi(current)
    messages("warning","Todo removed!");
   
  };

  const handleChangePage = (page:number) => {
    setLoading(true)
    setCurrent(page)
    getListApi(page)
    
  }
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
            onConfirm={() => handleDeleteItem(record)}
          >
            <Button type="primary" danger>
              <CloseOutlined />
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  if(loading) return <Skeleton></Skeleton> 
  
  return (
    <Table
      loading={loading}
      pagination={{
        pageSize: 10,
        current: current,
        total: total,
        onChange: (page) => handleChangePage(page)
      }}
      columns={columns}
      dataSource={list}
    />
  );
};
export default TableItem;
