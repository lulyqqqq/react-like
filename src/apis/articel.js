// 封装和文章模块相关的接口函数


import {request} from "@/utils";

// 1.获取频道列表
export function getChannelApi() {
    // 返回的是promise ->res
    return request({
        url: '/channels',
        method: 'GET'
    })
}

// 2. 提交表单
export function createArticleApi(data) {
    return request({
        // draft=false:不是草稿
        url: '/mp/articles?draft=false',
        method: 'POST',
        data
    })
}

// 3. 获得文章列表
export function getArticleListApi(params){
    return request({
        url: '/mp/articles',
        method: 'GET',
        params
    })
}
