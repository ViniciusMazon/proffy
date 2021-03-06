import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import Registration from './pages/Registration';
import RegistrationCompleted from './pages/RegistrationCompleted';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordSuccess from './pages/ResetPasswordSuccess';
import ForgotPasswordSuccess from './pages/ForgotPasswordSuccess';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';

function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route exact path="/registration" component={Registration} />
      <Route path="/registration/welcome" component={RegistrationCompleted} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/reset-password/:email/:token" component={ResetPassword} />
      <Route exact path="/reset-password/success" component={ResetPasswordSuccess} />
      <Route path="/forgot-password/success" component={ForgotPasswordSuccess} />
      <Route exact path="/home" component={Landing} />
      <Route exact path="/profile" component={Profile} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm} />
    </BrowserRouter>
  );
}

export default Routes;
