import React, { useContext } from 'react';
import { UserAuthContext } from '../Context/UserAuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
  const { isLogin } = useContext(UserAuthContext);

  if (!isLogin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRouter;
