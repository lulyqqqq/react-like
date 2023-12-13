// 封装获取频道列表的逻辑
import {useEffect, useState} from "react";
import {getChannelApi} from "@/apis/articel";

function useChannel() {
    // 1.获取频道列表数据
    // 获取频道列表
    const [channelList, setChannelList] = useState([])
    useEffect(() => {
        // 1. 封装函数 在函数体内进行调用接口
        const getChannelList = async () => {
            const res = await getChannelApi()
            setChannelList(res.data.channels)
        }
        // 2.调用函数
        getChannelList()
    }, []);

    // 2. 将组件中的数据return出去
    return {
        channelList
    }
}

export {useChannel}