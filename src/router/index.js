// 路由配置
import Layouts from "@/pages/Layouts";
import Login from "@/pages/Login";
import AuthRoute from "@/components/AuthRoute";
// 配置路由实例
import * as React from "react";
import {createBrowserRouter} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRoute> <Layouts/> </AuthRoute>
    },
    {
        path: "/login",
        element: <Login/>
    }
])


export default router
