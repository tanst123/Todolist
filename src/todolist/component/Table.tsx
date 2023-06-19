import React from "react";
import { Button, Table, Popconfirm, Switch, Space } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import { useContext } from "react";
import { contextTodo } from "./ContextTodo";
import { listType } from "../../model";


interface props {
  handleDeleteItem: (record:listType) => void,
  handleEditItem: (record:listType) => void,
  messages:(type:string | any, descripton: string) => void,
  getListApi: (a: number) => void,
  total: number,
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
type setListType = React.Dispatch<React.SetStateAction<listType[]>>
const TableItem = ({ handleDeleteItem, handleEditItem, messages, getListApi,total, loading, setLoading}:props) => {
  const [list, setList] = useContext<[listType[], setListType ]>(contextTodo);
  
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
              onChange={() => handleChangeSwitch(record)}
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

  // const data = list?.map((item) => {
  //   return {
  //     key: item.key,
  //     job: <Tag color={"red"}>{item.job}</Tag>,
  //     startDate: item.startDate,
  //     endDate: item.endDate,
  //     note: item.note,
  //     date: item.date,
  //   };
  // });

  const handleChangeSwitch = (record:listType) => {
    const item = document.querySelector(`tr[data-row-key="${record.key}"]`);
    const spanChange = item?.querySelector("span");

    if (spanChange?.classList.contains("ant-tag-red")) {
      spanChange?.classList.replace("ant-tag-red", "ant-tag-blue");
    } else {
      spanChange?.classList.replace("ant-tag-blue", "ant-tag-red");
    }

    messages("info", "Todo state updated!");
  };

  
  return (
    <Table
      loading={loading}
      pagination={{
        pageSize: 10,
        defaultCurrent: 1,
        total: total,
        onChange: (page) => {
          setTimeout(() => {
            setLoading(true)
            getListApi(page)
          }, 100)
        },
      }}
      columns={columns}
      dataSource={list}
    />
  );
};
export default TableItem;
