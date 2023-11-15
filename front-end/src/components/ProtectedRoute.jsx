import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setUser } from "../features/Users/userSlice";
// import { hideLoading, showLoading } from "../features/Alert/alertSlice";

function ProtectedRoute(props) {
  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      // dispatch(showLoading());
      const response = await axios.get(
        "http://localhost:5000/api/user/get-user-by-id",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data._id));
        // console.log("this is from user set", response.data.data._id);
        // navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      // dispatch(hideLoading());
      localStorage.clear();
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  if (token) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
