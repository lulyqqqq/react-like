import React from 'react';
import {Button, Card, Form, Input, message} from 'antd';
import logo from '@/assets/02.png'
import './index.scss'
import {fetchLogin} from "@/store/modules/user";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    // 添加async 异步发送防止执行异步方法中token数据不一致导致错误
    const onFinish = async (values) =>{
        // 触发异步登录方法
        await dispatch(fetchLogin(values))
        // 1.跳转页面 跳转到首页
        navigate("/")
        // 2. 提醒用户登录成功
        message.success("登陆成功")

    }
    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                {/* 登录表单 */}
                <Form onFinish={onFinish} validateTrigger="onBlur">
                    <Form.Item
                        name="mobile"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '请输入正确的手机号！'
                            }
                        ]}>
                        <Input size="large" placeholder="请输入账号" />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}>
                        <Input size="large" placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>

    );
};
export default Login;