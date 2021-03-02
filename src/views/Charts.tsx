import React, {useState} from 'react';
import {Layout} from '../components/Layout';
import {Echarts} from '../components/Echarts';
import styled from 'styled-components';
import {useRecords} from '../hooks/useRecords';
import dayjs from 'dayjs';
import {Total} from '../components/Total';
import NP from 'number-precision';
import {days} from '../lib/days'
import {CategorySection} from './Money/CategorySection';
import {TagsSum} from '../components/TagsSum';

const Center =styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  >.pie{
    height: 30vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const Wrapper = styled.div`
  background: white;
  margin: 0 8px 8px 8px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 30vh;
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
const CategoryWrapper = styled.div`
  
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75vw;
  >section{
    border: 1px solid rgb(164, 164, 166);
    border-radius: 4px;
    margin-top: 16px;
    font-size: 14px;
    >ul{
      >li{
        color: rgb(159, 159, 159);
        padding: 4px;
        &.selected{
          background: rgb(75, 156, 240);
          color: white;
        }
        &.selected::after{
          display: none;
        }
      }
    }
  }
`


const Charts = () => {
    const [category, setCategory] = useState<'+' | '-'>('-');
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

    let yIncome=[];
    for (let i=1;i<=dayjs(month).daysInMonth();i++){
        let date:string;
        if (i < 10) {
            date = `${month}-0${i}`;
        } else {
            date = `${month}-${i}`;
        }
        let y = 0;
        if ((incomeRecord.filter(r=>r.date===date)).length===0){
            yIncome.push(0)
        }else {
            const dailyIncome = incomeRecord.filter(r=>r.date===date);
            dailyIncome.forEach((d)=>{
                return y = NP.plus(d.amount,y)
            })
            yIncome.push(y)
        }
    }

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
            <Center>
                <Wrapper>
                    <CategoryWrapper>
                        <CategorySection value={category} onChange={value => setCategory(value)}/>
                    </CategoryWrapper>
                    {category==='-'?
                        <Echarts days={days(month)} yExpend={yExpend}/> :
                        <Echarts days={days(month)} yExpend={yIncome}/>
                    }
                </Wrapper>
            </Center>
            <Center>
                <div className="pie">
                    <TagsSum monthExpend={monthExpend}/>
                </div>
            </Center>
        </Layout>
    );
};


export {Charts};