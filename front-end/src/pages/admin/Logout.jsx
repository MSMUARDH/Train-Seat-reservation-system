import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/Users/userSlice";

const Logout = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <Button
        danger
        onClick={() => {
          localStorage.clear();
          dispatch(setUser(null));
          navigate("/login");
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Logout;
