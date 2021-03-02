import React, { useEffect, useRef} from 'react';
import * as echarts from 'echarts';

type Props={
    yExpend : number[];
    days:string[] | undefined;
}


const Echarts:React.FC<Props> = (props) => {
    const option = {
        // title:{
        //     show:true,
        //     text:'本月支出表',
        // },
        xAxis: {
            type: 'category',
            data: props.days
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: props.yExpend,
            type: 'line'
        }]
    };
    const container = useRef(null);
    const chart = useRef(null);
    useEffect(() => {
        // console.log(container.current);
        // @ts-ignore
        container.current.style.width = `90%`;
        // @ts-ignore
        container.current.style.height = `100%`;
        // @ts-ignore
        chart.current = echarts.init(container.current,'white')
    }, []);

    useEffect(()=>{
        // @ts-ignore
        chart.current.setOption(option)
    },[option])

    return (
        <div ref={container}/>
    );
};

export {Echarts}