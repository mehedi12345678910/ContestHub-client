import React from "react";
import { BallTriangle } from "react-loader-spinner";
import { Navigate, useLocation } from "react-router-dom";
import useSingleUser from "../hooks/useSingleUser";

const Admin = ({ children }) => {
  const { userData, isLoading } = useSingleUser();
  const location = useLocation();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </div>
    );
  }
  if (userData?.role === "admin") {
    return children;
  }
  return (
    <Navigate to="/dashboard" state={{ from: location }} replace></Navigate>
  );
};

export default Admin;
