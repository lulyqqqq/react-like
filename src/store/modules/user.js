// 用户相关持久化存储的信息 使用状态管理
import {createSlice} from "@reduxjs/toolkit";
import {getToken, setToken as _setToken, request, removeToken} from "@/utils";

const userStore = createSlice({
    name: "user",
    // 数据状态
    initialState: {
        // 先从本地localStorage中取,如果没有再置为空
        token: getToken() || '',
        userInfo: {}
    },
    // 同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            // 存入localStorage存一份
            _setToken(action.payload)
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload
        },
        // 清除用户信息
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = {}
            // 清除本地token记录
            removeToken()
        }
    }
})

// 解构出actionCreater
const {setToken, setUserInfo,clearUserInfo} = userStore.actions
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

// 获取个人信息异步方法
const fetchUserInfo = () => {
    return async (dispatch) => {
        // 1.发送异步请求
        const res = await request.get('/user/profile')
        dispatch(setUserInfo(res.data))
    }
}


export {setToken, fetchLogin, fetchUserInfo,clearUserInfo}

export default userReducer


