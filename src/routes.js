import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/Login';
import Students from './pages/Students';
import NewStudent from './pages/NewStudent';

export default function Routes(){
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/students" component={Students} />
            <Route path="/student/newstudent/:studentId" component={NewStudent} />
        </Switch>
        </BrowserRouter>
    );
  }
