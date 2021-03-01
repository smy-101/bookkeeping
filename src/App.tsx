import React from 'react';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {Money} from './views/Money';
import {Statistics} from './views/Statistics';
import {Tags} from './views/Tags';
import {NoMatch} from './views/NoMatch';
import styled from 'styled-components';
import {Tag} from './views/Tag';
import {Charts} from './views/Charts';

const AppWrapper = styled.div`
  color: #333;
`;

function App() {
  return (
    <AppWrapper>
      <Router>
        <Switch>
          <Route exact path="/tags/:id">
            <Tag/>
          </Route>
          <Route exact path="/tags">
            <Tags/>
          </Route>
          <Route exact path="/money">
            <Money/>
          </Route>
          <Route exact path="/statistics">
            <Statistics/>
          </Route>
          <Route exact path="/charts">
            <Charts/>
          </Route>
          <Redirect exact from="/" to="/money"/>
          <Route path="*">
            <NoMatch/>
          </Route>
        </Switch>
      </Router>
    </AppWrapper>
  );
}


export default App;
