// 封装柱状图
import * as echarts from 'echarts';
import {useEffect, useRef} from "react";
import './barChart.scss'

// 1.功能代码抽象到这个组件中
// 2.把可变的部分抽象成props参数

const BarChart = (props) => {
    // 使用ref操作dom元素
    const chartRef = useRef(null);
    // 初始化图表信息
    useEffect(() => {
        // 1.获取渲染图表的dom节点 原生dom操作
        // const chartDom = document.getElementById('main');
        const chartDom = chartRef.current;
        // 2.图表初始化生成图表实例对象
        const myChart = echarts.init(chartDom, "dark");
        // 3.准备图表参数
        const option = {
            title: {
                text: props.title
            },
            xAxis: {
                type: 'category',
                data: props.frame
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: props.data,
                    type: 'bar',
                    label: {
                        show: true,
                        position: "top"
                    }
                },
            ]
        };
        // 4.使用图表参数完成图表的渲染
        option && myChart.setOption(option);

    }, [props]);

    return (
        <div className="chart" id="main" ref={chartRef}></div>
    )
}

export default BarChart