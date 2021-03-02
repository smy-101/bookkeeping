import React, {useEffect, useRef} from 'react';
import * as echarts from 'echarts';
import {data} from './TagsSum';

type Props = {
    data: data[]
}


const PieChart: React.FC<Props> = (props) => {
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            // show:false,
            top: '90%',
            left: 'center'
        },
        series: [
            {
                // name: '每月收支',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: '40',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: props.data
            }
        ]
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
        chart.current = echarts.init(container.current, 'white');
    }, []);

    useEffect(() => {
        // @ts-ignore
        chart.current.setOption(option);
    }, [option]);

    return (
        <div ref={container}/>
    );
};

export {PieChart};