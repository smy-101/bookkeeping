import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';

const Wrapper = styled.div`
  min-height: 60px;
  background: rgb(0, 102, 204);
  display: flex;
  justify-content:space-between;
  align-items: center;
  >h2{
    color: white;
  }
  >.icon {
    fill: white;
    margin-left: 12px;
    width: 24px;
    height: 24px;
  }
  >div{
    margin-right: 12px;
    color: white;
  }
`
type Props={
    content:string;
}

const Header:React.FC<Props> = (props) => {
    return (
        <Wrapper>
            <Icon className="icon" name="bookkeeping"/>
            <h2>简单记账</h2>
            <div>{props.content}</div>
        </Wrapper>
    );
};

export {Header};