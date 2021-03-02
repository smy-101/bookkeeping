import React, {useState} from 'react';
import {Layout} from '../components/Layout';
import {Echarts} from '../components/Echarts';
import styled from 'styled-components';
import {useRecords} from '../hooks/useRecords';
// import _ from 'lodash';
import dayjs from 'dayjs';
import {Total} from '../components/Total';
import NP from 'number-precision';

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
    // const day = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28'];
    // let days;
    // if (dayjs(month).daysInMonth()===28){
    //     days = day;
    // }else if (dayjs(month).daysInMonth()===29){
    //     days = [...day,'29'];
    // }else if (dayjs(month).daysInMonth()===30){
    //     days = [...day,'29','30'];
    // }else if (dayjs(month).daysInMonth()===31){
    //     days=[...day,'29','30','31']
    // }


    console.log(balance);
    console.log(monthExpend);


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