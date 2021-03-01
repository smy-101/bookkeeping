import React, {useState} from 'react';
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

const MonthWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 36px;
  background: rgb(0, 102, 204);
  >div{
    color: white;
    margin-left: 14px;
  }
  >.month{
    color: white;
    border: 0;
    background-color: transparent;
    outline: none;
    position: relative;
    overflow: hidden;
    height: 30px;
    width: 120px;
    >input{
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
    }
  }
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
    const today = dayjs().format('YYYY-MM');
    const [month,setMonth]=useState(today);
    const {records} = useRecords();
    const incomeRecords = records.filter(r => r.category === '-');
    const expendRecords = records.filter(r=>r.category === '+');
    const dailyIncome = _.groupBy(incomeRecords,(r)=>{
        return dayjs(r.date).format('YYYY-MM-DD')
    })
    const dailyExpend = _.groupBy(expendRecords,(r)=>{
        return dayjs(r.date).format('YYYY-MM-DD')
    })
    const monthIncome = _.groupBy(incomeRecords,(r)=>{
        return dayjs(r.date).format('YYYY-MM')
    })

    const onMonthChange=(e: { target: { value: any; }; })=>{
        setMonth(e.target.value);
    }


    console.log(monthIncome);
    console.log(dailyIncome);
    console.log(dailyExpend);
    return (
        <Layout content="统计">
            <MonthWrapper>
                <div>当前月份</div>
                <button className="month">
                    <strong>{month}</strong>
                    <input type="month" value={month} onChange={onMonthChange}/>
                </button>
            </MonthWrapper>
            <Wrapper>
                <Echarts option={option}/>
            </Wrapper>
        </Layout>
    );
};


export {Charts};