import React, {useState} from 'react';
import {
    DiffOutlined, EditOutlined,
    HomeOutlined, LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,

} from '@ant-design/icons';
import {Layout, Menu, Button, theme, Popconfirm} from 'antd';
import "./index.scss"
import {Outlet, useLocation, useNavigate} from "react-router-dom";

const {Header, Sider, Content} = Layout;
const Layouts = () => {
    const items = [
        {
            label: '首页',
            key: '/',
            icon: <HomeOutlined/>,
        },
        {
            label: '文章管理',
            key: '/article',
            icon: <DiffOutlined/>,
        },
        {
            label: '创建文章',
            key: '/publish',
            icon: <EditOutlined/>,
        },
    ]
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const navigate = useNavigate();
    const onMenuClick = (route) => {
        console.log("菜单被点击了", route)
        const path = route.key
        // 跳转页面
        navigate(path)
    }
    // 获得当前路径
    const location = useLocation();
    const selectedKeys = location.pathname
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical"/>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={selectedKeys}
                    onClick={onMenuClick}
                    items={items}
                />
            </Sider>

            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <div className="user-info">
                        <Button className="button"
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                        />
                        <div className="span">
                            <span className="user-name">02</span>
                            <span className="user-logout">
                                <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
                                    <LogoutOutlined/> 退出
                                </Popconfirm>
                            </span>
                        </div>
                    </div>
                </Header>

                <Layout className="layout-content" style={{padding: 20}}>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        {/*二级路由出口*/}
                        <Outlet/>
                    </Content>
                </Layout>

            </Layout>
        </Layout>
    );
};
export default Layouts;