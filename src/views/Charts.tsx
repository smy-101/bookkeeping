import React from 'react';
import {Layout} from '../components/Layout';
import {Echarts} from '../components/Echarts';
import styled from 'styled-components';
import { useRecords} from '../hooks/useRecords';
import _ from 'lodash';
import dayjs from 'dayjs';

const Wrapper = styled.div`
  height: 25vh;
  width: 100vw;
`


const option =  {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
    }]
};

const Charts = () => {
    const {records} = useRecords();
    const incomeRecords = records.filter(r => r.category === '-');
    const expendRecords = records.filter(r=>r.category === '+');
    const dailyIncome = _.groupBy(incomeRecords,(r)=>{
        return dayjs(r.date).format('YYYY-MM-DD')
    })
    const dailyExpend = _.groupBy(expendRecords,(r)=>{
        return dayjs(r.date).format('YYYY-MM-DD')
    })

    console.log(dailyIncome);
    console.log(dailyExpend);
    return (
        <Layout content="统计">
            <input type="month"/>
            <Wrapper>
                <Echarts option={option}/>
            </Wrapper>
        </Layout>
    );
};


export {Charts};