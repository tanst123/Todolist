import { CloseOutlined, CheckOutlined  } from '@ant-design/icons';
import { Button,  List, Tag, Switch,  Popconfirm} from 'antd';

const ListItem = ({list, handleDeleteItem, messages}) => {
    return ( 
        <List
            dataSource={list}
            pagination = {{
                page: 1
            }}
            renderItem={(item, index) => (
            <List.Item 
                className = {`id-${index}`}
                actions={[
                        <Switch
                            onClick={() => messages('info', 'Todo state updated!')}
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            defaultChecked = {false}
                        />,
                        <Popconfirm
                            placement="top"
                            title="Are you sure you want to delete?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => handleDeleteItem(index)}
                        >
                            <Button type="primary" danger>
                                <CloseOutlined />
                            </Button>
                        </Popconfirm>
                        ]}
                
            >
                <List.Item.Meta
                    title={<Tag color="red" key={index}>{item.job}</Tag>}
                />
            </List.Item>
            )}
        />
     );
}

export default ListItem;