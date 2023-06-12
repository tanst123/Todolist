import { Form, Input, Button } from "antd";
import { PlusCircleOutlined  } from '@ant-design/icons';
const From = ({onFinish, onFinishFailed, refButton}) => {
    return ( 
        <Form
            className="form-ant-input"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                className='form-item-wrap-input'
                name="job"
                rules={[{ required: true, message: 'The field is required'}]}
            >
            <Input className="input-ant-job" placeholder="What needs to be done?"/>
            </Form.Item>
            <Form.Item 
                className='form-item-wrap-btn'
            >
                <Button 
                    ref={refButton} 
                    type="primary" 
                    htmlType="submit"
                    icon={<PlusCircleOutlined />
                }
                >
                    Add todo
                </Button>
            </Form.Item>
        </Form>
     );
}

export default From;