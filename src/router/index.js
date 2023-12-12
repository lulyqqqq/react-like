// 路由配置
import Layouts from "@/pages/Layouts";
import Login from "@/pages/Login";
import AuthRoute from "@/components/AuthRoute";
// 配置路由实例
import * as React from "react";
import {createBrowserRouter} from "react-router-dom";
import Home from "@/pages/Home";
import Publish from "@/pages/Publish";
import Article from "@/pages/Article";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRoute> <Layouts/> </AuthRoute>,
        children: [
            {
                index: true,
                // path:'home',
                element: <Home/>

            },
            {
                path: 'article',
                element: <Article/>
            },
            {
                path: 'publish',
                element: <Publish/>
            },
        ]
    },
    {
        path: "/login",
        element: <Login/>
    }
])


export default router
