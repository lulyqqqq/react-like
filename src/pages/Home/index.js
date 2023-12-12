import BarChart from "@/pages/Home/components/BarChart";

const Home = () => {

    const frontFrame = ['Vue', 'React', 'Angular']
    const frontSatisfied = [90, 70, 60]
    const frontUsed = [60, 75, 30]

    const backendFrame = ['Gin', 'Beego', 'GoFrame', 'Iris']
    const backendSatisfied = [90, 70, 80, 10]
    const backendUsed = [95, 75, 65, 25]
    return (
        <div className="chartMargin">
            <BarChart title="前端常用框架满意度" frame={frontFrame} data={frontSatisfied}/>
            <BarChart title="前端常用框架使用度" frame={frontFrame} data={frontUsed}/>

            <BarChart title="后端常用框架满意度" frame={backendFrame} data={backendSatisfied}/>
            <BarChart title="后端常用框架使用度" frame={backendFrame} data={backendUsed}/>
        </div>
    )
}
export default Home