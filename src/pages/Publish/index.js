import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select
} from 'antd'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {PlusOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import './index.scss'
import {useEffect, useState} from "react";
import {createArticleApi, getChannelApi} from "@/apis/articel";

const {Option} = Select
const Publish = () => {
    // 获取频道列表
    const [channelList, setChannelList] = useState([])
    useEffect(() => {
        // 1. 封装函数 在函数体内进行调用接口
        const getChannelList = async () => {
            const res = await getChannelApi()
            setChannelList(res.data.channels)
        }
        // 2.调用函数
        getChannelList()
    }, []);

    //提交表单事项
    const onFinish = (formValue) => {
        const {title, content, channel_id} = formValue
        // 获取表单数据
        console.log(formValue)
        // 1.处理表单数据
        // 1.1 表单对象
        const reqData = {
            title,
            content,
            cover: {
                type: 0,
                images: [],
            },
            channel_id
        }

        // 2.调用接口
        createArticleApi(reqData)
    }

    const [imageList, setImageList] = useState([])
    const onUploadChange = (value)=>{
        console.log('正常上传中')
        setImageList(value.fileList)
    }
    return (
        <div>
            <Card
                title={
                    <Breadcrumb items={[
                        {title: <Link to={'/'}>首页</Link>},
                        {title: '发布文章'},
                    ]}
                    />
                }>
                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 16}}
                    initialValues={{type: 1}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{required: true, message: '请输入文章标题'}]}
                    >
                        <Input placeholder="请输入文章标题" style={{width: 400}}/>
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{required: true, message: '请选择文章频道'}]}
                    >
                        <Select placeholder="请选择文章频道" style={{width: 400}}>
                            {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {/*
                            1. listType:决定选择文件框的外观样式
                            2. showUploadList:控制显示上传列表
                        */}
                        <Upload
                            listType="picture-card"
                            showUploadList
                            name="image"
                            action={'http://geek.itheima.net/v1_0/upload'}
                            onChange={onUploadChange}
                        >
                            <div style={{marginTop: 8}}>
                                <PlusOutlined/>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{required: true, message: '请输入文章内容'}]}
                    >
                        {/* 富文本编辑框   */}
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入内容"
                            // value={value}
                            // onChange={handleChangeValue}
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 4}}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
export default Publish