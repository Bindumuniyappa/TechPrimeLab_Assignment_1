import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
  const { isLogin } = useContext(AuthContext);

  if (!isLogin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRouter;
