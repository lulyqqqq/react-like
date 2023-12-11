// 路由配置
import Layouts from "@/pages/Layouts";
import Login from "@/pages/Login";

// 配置路由实例
import * as React from "react";
import {createBrowserRouter} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layouts/>
    },
    {
        path: "/login",
        element: <Login/>
    }
])


export default router
