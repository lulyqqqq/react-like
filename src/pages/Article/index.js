import {Link} from 'react-router-dom'
import {Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space} from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import img404 from '@/assets/error.png'
import {useChannel} from "@/hooks/useChannel";
import {useEffect, useState} from "react";
import {getArticleListApi} from "@/apis/articel";

const {Option} = Select
const {RangePicker} = DatePicker


const Article = () => {
    // 获得频道列表数据
    const {channelList} = useChannel()
    // 使用枚举
    const status = {
        1: <Tag color="warning">待审核</Tag>,
        2: <Tag color="success">审核通过</Tag>
    }
    // 准备列数据
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt=""/>
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            /**
             * data =>后端返回的状态status 根据它做条件渲染
             * data === 1 =>待审核
             * data === 2 =>审核通过
             */
            render: data => status[data]
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined/>}/>
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined/>}
                        />
                    </Space>
                )
            }
        }
    ]
    // 准备表格body数据
    const data = [
        {
            id: '8218',
            comment_count: 0,
            cover: {
                images: [],
            },
            like_count: 0,
            pubdate: '2019-03-11 09:00:00',
            read_count: 2,
            status: 2,
            title: 'wkwebview离线化加载h5资源解决方案'
        }
    ]

    // 获取文章列表
    const [list, setList] = useState([])
    useEffect(() => {
        async function getList() {
            const res = await getArticleListApi()
            setList(res.data.results)
        }

        getList()
    }, []);

    return (
        <div className="article">
            <Card
                title={
                    <Breadcrumb items={[
                        {title: <Link to={'/'}>首页</Link>},
                        {title: '文章列表'},
                    ]}
                    />
                }>
                <Form initialValues={{status: ''}}>
                    <Form.Item label="状态" name="status">
                        {/*单选框*/}
                        <Radio.Group>
                            <Radio value={''}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={1}>审核通过</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                    >
                        <Select placeholder="请选择频道" style={{width: 120}}>
                            {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{marginLeft: 40}}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            {/*表格筛选区域*/}
            <Card style={{marginTop: 10}} title={`根据筛选条件查询到 ${list.length} 条数据`}>
                <Table rowKey="id" columns={columns} dataSource={list}/>
            </Card>

        </div>
    )
}
export default Article