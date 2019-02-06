import React from 'react';
import { AuthConsumer } from '../contexts/auth';
import Messages from '../components/Messages';

export default () => (
  <AuthConsumer>
    {auth => <Messages {...auth} />}
  </AuthConsumer>
);
