import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select, message
} from 'antd'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {PlusOutlined} from '@ant-design/icons'
import {Link, useNavigate, useSearchParams} from 'react-router-dom'
import './index.scss'
import {useEffect, useRef, useState} from "react";
import {createArticleApi, getArticleById, updateArticleApi} from "@/apis/articel";
import {useChannel} from "@/hooks/useChannel";

const {Option} = Select
const Publish = () => {
    // 获取频道列表
    const {channelList} = useChannel()
    const formRef = useRef(null);
    const navigate = useNavigate();
    //提交表单事项
    const onFinish = (formValue) => {
        if (imageList.length !== imageType) {
            return message.error("封面类型和图片数量不匹配")
        }
        console.log(imageList)
        // 获取form表单上的数据
        const {title, content, channel_id} = formValue
        // 获取表单数据
        console.log(formValue)
        // 1.处理表单数据
        // 1.1 表单对象
        const reqData = {
            title,
            content,
            cover: {
                type: imageType, // 封面模式
                /**
                 * 这里的url处理逻辑只是在新增时候的逻辑
                 * 编辑图片的时候,重新上传图片从upload中获得的数据是由response返回的,需要做区分
                 * 回显的时候,图片地址是直接存在url中的
                 */
                images: imageList.map(item => {
                    if (item.response) {
                        return item.response.data.url
                    } else {
                        return item.url
                    }
                }),  // 封面列表
            },
            channel_id
        }

        // 2.调用接口 调用不同的接口 存在文章Id ?编辑-编辑接口 : 新增-新增接口
        if (articleId) {
            updateArticleApi({
                ...reqData,
                id: articleId
            })
        } else {
            createArticleApi(reqData)
        }

        // 重置表单字段的值
        formRef.current.resetFields();
        setImageList([])
        //发布成功
        message.success("发布成功!")
        // 发布修改完 跳转文章管理页
        navigate("/article")
    }

    // 同时控制
    const [imageList, setImageList] = useState([])
    const onUploadChange = (value) => {
        console.log('正常上传中', value)
        setImageList(value.fileList)
    }
    // 切换封面类型
    const [imageType, setImageType] = useState(1)
    const onTypeChange = (e) => {
        console.log("切换封面了", e.target.value)
        setImageType(e.target.value)
    }
    const [form] = Form.useForm()
    const [searchParams] = useSearchParams();
    const articleId = searchParams.get("id")

    // 回显数据,将数据重新放入form表单
    useEffect(() => {
        // 1.通过id获取数据
        async function getArticleDetail() {
            const res = await getArticleById(articleId)
            const data = res.data
            const {cover} = data
            // 2.调用实例方法,完成回填
            form.setFieldsValue({
                ...data,
                type: cover.type
            })
            // 回填图片列表类型字段
            setImageType(cover.type)
            // 回显图片 需要一个对象的形式才能回显图片信息
            setImageList(cover.images.map(url => {
                return {url}
            }))
        }

        // 只有id时候才能调用函数
        if (articleId) {
            getArticleDetail()
        }

    }, [articleId, form]);

    return (
        <div>
            <Card
                title={
                    <Breadcrumb items={[
                        {title: <Link to={'/'}>首页</Link>},
                        {title: `${articleId ? '编辑' : '发布'}'文章'`}
                    ]}
                    />
                }>
                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 16}}
                    initialValues={{type: 1}}
                    onFinish={onFinish}
                    ref={formRef}
                    form={form}
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
                            {/*单选框*/}
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {/*
                            1. listType:决定选择文件框的外观样式
                            2. showUploadList:控制显示上传列表
                            3. action是下载图片的请求地址
                            4. name="image" 是当前下载图片指定name要和后端字段对应
                            5. onChange是回调函数,在执行下载的时候会一直执行
                        */}
                        {imageType > 0 &&
                            <Upload
                                fileList={imageList}
                                listType="picture-card"
                                showUploadList
                                name="image"
                                action={'http://geek.itheima.net/v1_0/upload'}
                                onChange={onUploadChange}
                                maxCount={imageType}
                            >
                                <div style={{marginTop: 4}}>
                                    <PlusOutlined/>
                                </div>
                            </Upload>
                        }
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