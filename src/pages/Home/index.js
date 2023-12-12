import * as echarts from 'echarts';
import {useEffect, useRef} from "react";
import './index.scss'

const Home = () => {
    // 使用ref操作dom元素
    const chartRef = useRef(null);
    useEffect(() => {
        // 1.获取渲染图表的dom节点 原生dom操作
        // const chartDom = document.getElementById('main');
        const chartDom = chartRef.current;
        // 2.图表初始化生成图表实例对象
        const myChart = echarts.init(chartDom);
        // 3.准备图表参数
        const option = {
            xAxis: {
                type: 'category',
                data: ['Vue', 'React', 'Angular']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [10, 40, 70],
                    type: 'bar'
                }
            ]
        };
        // 4.使用图表参数完成图表的渲染
        option && myChart.setOption(option);
    }, []);
    return (
        <div>
            <div className="chart" id="main" ref={chartRef}></div>
            this is home
        </div>
    )
}
export default Home