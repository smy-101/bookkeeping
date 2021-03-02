import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames'


const Wrapper = styled.div`
  background: white;
  margin: 8px;
  height: 15vh;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  >.sum{
    width: 100%;
    margin: 6px;
    >.dis{
      display: flex;
      justify-content: space-between;
      margin: 10px 20px 0 20px;
    }
    >.wen{
      color: rgb(163, 163, 163);
      font-size: 14px;
    }
    >.shu{
      color: black;
    }
  }
`
type Props = {
    income:number;
    expend:number;
    balance:number;
}

const Total:React.FC<Props> = (props) => {
    return (
        <Wrapper>
            <h4>收支总览</h4>
            <div className="sum">
                <div className={classNames('dis','wen')}>
                    <span>支出</span>
                    <span>收入</span>
                    <span>结余</span>
                </div>
                <div className={classNames('dis','shu')}>
                    <span><strong>{props.expend}</strong></span>
                    <span><strong>{props.income}</strong></span>
                    <span><strong>{props.balance}</strong></span>
                </div>
            </div>
        </Wrapper>
    );
};

export {Total};

