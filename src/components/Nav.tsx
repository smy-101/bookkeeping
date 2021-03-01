import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import React from 'react';
import Icon from './Icon';

const NavWrapper = styled.nav`
  background: rgb(229, 229, 229);
  line-height: 24px;
  box-shadow: 0 0 3px rgba(0,0,0,0.25);
  > ul {
    display:flex;
    > li{
      width: 25%;
      text-align:center;
      > a {
        display: flex;
        flex-direction: column;
        padding: 4px 0;
        justify-content: center;
        align-items: center;
        .icon {
          width: 24px;      
          height: 24px;
        }
        &.selected{
          color: blue;
          .icon{
            fill: blue;
          }
        }
      }
    }
  }
`;

const Nav = () => {
  return (
    <NavWrapper>
      <ul>
        <li>
          <NavLink to="/money" activeClassName="selected">
            <Icon name="money"/>
            记账
          </NavLink>
        </li>
        <li>
          <NavLink to="/tags" activeClassName="selected">
            <Icon name="tags"/>
            标签
          </NavLink>
        </li>
        <li>
          <NavLink to="/statistics" activeClassName="selected">
            <Icon name="detailed"/>
            明细
          </NavLink>
        </li>
        <li>
          <NavLink to="/charts" activeClassName="selected">
            <Icon name="statistics"/>
            统计
          </NavLink>
        </li>
      </ul>
    </NavWrapper>
  );
};

export default Nav;
