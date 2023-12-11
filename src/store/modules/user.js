// 用户相关持久化存储的信息 使用状态管理
import {createSlice} from "@reduxjs/toolkit";
import {request} from "@/utils";

const userStore = createSlice({
    name: "user",
    // 数据状态
    initialState: {
        // 先从本地localStorage中取,如果没有再置为空
        token: localStorage.getItem("token_key") || ''
    },
    // 同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            // 存入localStorage存一份
            localStorage.setItem("token_key",action.payload)
        }
    }
})

// 解构出actionCreater
const {setToken} = userStore.actions
// 获取reducer函数
const userReducer = userStore.reducer;

// 异步方法 完成登录获取token
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        // 1.发送异步请求
        const res = await request.post('/authorizations', loginForm)
        // 2.提交同步action进行token存入
        dispatch(setToken(res.data.token))
    }
}


export {setToken, fetchLogin}

export default userReducer


