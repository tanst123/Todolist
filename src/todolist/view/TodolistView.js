
import { useRef, useContext } from 'react';
import '../style/style.scss'
import {  Card, message,Space } from 'antd';
import Form from '../component/Form';
import ListItem from '../component/List';
import { contextTodo } from '../component/ContextTodo';

const TodolistView = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [list, setList] = useContext(contextTodo)

    const refButton = useRef();
      const messages = (type, descripton) => {
        messageApi.open({
            type: type,
            content: descripton,
          });
      }
      
    const onFinish = (e) => {
        setList(prev => [...prev, {
            job: e.job
        }])
        messages('success','Todo added!')
      };
      
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    const handleDeleteItem = (index) => {
        document.querySelector(`.id-${index}`).remove();
        messages('warning','Todo removed!')
    }
    return (
        
        <div className = "todolist-view">
            
             {contextHolder}
            <div className="todolist-header">
                <h4>Add Todo</h4>
                <p>To add a todo, just fill the form below and click in add todo.</p>
            </div>    
            <div className="todolist-container">
                <div className="todolist-content">
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Card title="Create a new todo" >
                           <Form  
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                refButton={refButton}
                            />
                        </Card>
                    
                        <Card title="Todo List" >
                            <ListItem 
                                list={list}
                                handleDeleteItem = {handleDeleteItem}
                                messages = {messages}
                            />
                        </Card>
                   </Space>
                </div>
            </div>
           
        </div>
    )
}


export default TodolistView;