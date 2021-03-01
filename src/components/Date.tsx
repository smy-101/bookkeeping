import React, {useState} from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 36px;
  background: rgb(0, 102, 204);
  >div{
    color: white;
    margin-left: 14px;
  }
    >.date{
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

const Date = () => {
    const today = dayjs().format('YYYY-MM-DD');
    const [date, setDate] = useState(today);
    const onDateChange=(e: { target: { value: any; }; })=>{
        setDate(e.target.value);
        console.log(e.target.value);
    }

    return (
        <Wrapper>
            <div>当前选择日期：</div>
            <button className="date">
                <strong>{date}</strong>
                <input type="date" value={date} onChange={onDateChange}/>
            </button>

        </Wrapper>
    );
};

export {Date};