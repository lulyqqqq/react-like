
// 测试token是否注入

import {useEffect} from "react";
import {request} from "@/utils";

const Layouts = () => {
    useEffect(() => {
        request.get('/user/profile')
    }, []);
    return (
        <div>
            this is layouts
        </div>
    )
}
export default Layouts