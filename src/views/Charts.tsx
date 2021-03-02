import React, {useState} from 'react';
import {Layout} from '../components/Layout';
import {Echarts} from '../components/Echarts';
import styled from 'styled-components';
import {useRecords} from '../hooks/useRecords';
import _ from 'lodash';
import dayjs from 'dayjs';
import {Total} from '../components/Total';
import NP from 'number-precision';
import {days} from '../lib/days'

const Wrapper = styled.div`
  height: 25vh;
  width: 100vw;
`;

const MonthWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 36px;
  background: rgb(0, 102, 204);

  > div {
    color: white;
    margin-left: 14px;
  }

  > .month {
    color: white;
    border: 0;
    background-color: transparent;
    outline: none;
    position: relative;
    overflow: hidden;
    height: 30px;
    width: 120px;

    > input {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
    }
  }
`;


const option = {
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
    const [month, setMonth] = useState(today);
    const {records} = useRecords();
    const onMonthChange = (e: { target: { value: any; }; }) => {
        setMonth(e.target.value);
    };
    const expendRecord = records.filter(r => r.category === '-');
    const incomeRecord = records.filter(r => r.category === '+');

    let incomeSum = 0;
    const monthIncome = incomeRecord.filter(r => r.month === month);
    monthIncome.forEach((m) => {
        return incomeSum = NP.plus(m.amount, incomeSum);
    });

    let expendSum = 0;
    const monthExpend = expendRecord.filter(r => r.month === month);
    monthExpend.forEach((m) => {
        return expendSum = NP.plus(m.amount, expendSum);
    });

    let balance = NP.minus(incomeSum, expendSum);

    const monthlyExpend = _.groupBy(monthExpend,(m)=>{
        return dayjs(m.date).format('YYYY-MM-DD');
    })

    // let y=0;
    // const dailyExpend = expendRecord.filter(r=>r.date===`${month}-01`).forEach((d)=>{
    //     return y = NP.plus(d.amount,y)
    // })

    let yExpend=[];

    for (let i = 1; i <= dayjs(month).daysInMonth(); i++) {
        let date: string;
        if (i < 10) {
            date = `${month}-0${i}`;
        } else {
            date = `${month}-${i}`;
        }
        let y = 0;
        if ((expendRecord.filter(r => r.date === date)).length === 0) {
            yExpend.push(0);
        } else {
            const dailyExpend = expendRecord.filter(r => r.date === date);
            dailyExpend.forEach((d) => {
                return y = NP.plus(d.amount, y);
            });
            yExpend.push(y);
        }
    }
    console.log(yExpend);
    // console.log(days(month));
    // console.log(dailyIncome);
    return (
        <Layout content="统计">
            <MonthWrapper>
                <div>当前月份</div>
                <button className="month">
                    <strong>{month}</strong>
                    <input type="month" value={month} onChange={onMonthChange}/>
                </button>
            </MonthWrapper>
            <Total balance={balance} expend={expendSum} income={incomeSum}/>
            <Wrapper>
                <Echarts option={option}/>
            </Wrapper>
        </Layout>
    );
};


export {Charts};