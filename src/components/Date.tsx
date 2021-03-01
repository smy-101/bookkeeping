import React, {ChangeEventHandler} from 'react';
import styled from 'styled-components';

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

type Props={
    value:string;
    onChange:(value:string)=>void;
}

const Date:React.FC<Props> = (props) => {
    const date = props.value;
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        props.onChange(e.target.value);
    };


    return (
        <Wrapper>
            <div>当前选择日期：</div>
            <button className="date">
                <strong>{date}</strong>
                <input type="date" value={date} onChange={onChange}/>
            </button>
        </Wrapper>
    );
};

export {Date};