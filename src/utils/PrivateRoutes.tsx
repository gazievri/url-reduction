import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
  token: string;
}

const PrivateRoutes: React.FC<Props> = ({ token }) => {

  return (
    token ? <Outlet /> : <Navigate to="/signin" />
  )

}
export { PrivateRoutes };
