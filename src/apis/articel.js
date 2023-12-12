// 封装和文章模块相关的接口函数

// 1.获取频道列表
import {request} from "@/utils";

export function getChannelApi(){
    // 返回的是promise ->res
    return request({
        url:'/channels',
        method:'GET'
    })
}
