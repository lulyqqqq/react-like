// 路由配置
import Layouts from "@/pages/Layouts";
import Login from "@/pages/Login";
import AuthRoute from "@/components/AuthRoute";
// 配置路由实例
import * as React from "react";
import {createBrowserRouter} from "react-router-dom";
// import Home from "@/pages/Home";
// import Publish from "@/pages/Publish";
// import Article from "@/pages/Article";
import {lazy, Suspense} from "react";
// 路由懒加载
const Home = lazy(()=> import('@/pages/Home'))
const Publish = lazy(()=> import('@/pages/Publish'))
const Article = lazy(()=> import('@/pages/Article'))

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRoute> <Layouts/> </AuthRoute>,
        children: [
            {
                index: true,
                // path:'home',
                element: <Suspense fallback={'加载中'}><Home/></Suspense>
            },
            {
                path: 'article',
                element: <Suspense fallback={'加载中'}><Article/></Suspense>
            },
            {
                path: 'publish',
                element: <Suspense fallback={'加载中'}><Publish/></Suspense>
            },
        ]
    },
    {
        path: "/login",
        element: <Login/>
    }
])


export default router
