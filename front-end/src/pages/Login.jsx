/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useContext, useEffect } from "react";
import { Typography, Switch } from "antd";
import data from "../data/pages/login";
import { CommonForm } from "../components";
import handleApiCall from "../api/handleApiCall";
import LoadingAnimation from "../components/elements/LoadingAnimation";
import { useNavigate } from "react-router-dom";
import authContext from "../context/AuthContext";
import ForgetPassword from "./login/ForgetPassword";
import CommonNotification from "../components/common/CommonNotification";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loggedUserEmail = localStorage.getItem("train_user_email");
const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
const isAdmin = adminEmail === loggedUserEmail;

const Login = () => {
  const [isAuthenticated, setIsAuthenticated, setIsSystemAdmin] =
    useContext(authContext);
  const navigate = useNavigate();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const { Title } = Typography;

  const formRef = useRef(null);
  const notificationRef = useRef(null);

  // const handleLogin = formVal => {
  //   localStorage.setItem('train_user_email', formVal.email)
  //   handleApiCall({
  //     urlType: isLoginForm ? 'login' : 'register',
  //     data: formVal,
  //     setLoading,
  //     cb: (res, status) => {
  //       if (status === 201) {
  //         // redirection
  //         setIsAuthenticated(true)
  //         const userTkn = res.token
  //         const userData = res.user
  //         localStorage.setItem('userToken', userTkn)
  //         localStorage.setItem('userData', JSON.stringify(userData))

  //         if (formVal.email !== adminEmail) {
  //           setIsSystemAdmin(true)
  //           console.log(formVal.email === adminEmail, 'admin')
  //           return navigate('/', { replace: true })
  //         }
  //         return navigate('/admin', { replace: true })
  //       }
  //       if (status === 401) {
  //         notificationRef.current.openNotification({
  //           message: 'Login failed',
  //           description: 'Please check your email and password',
  //           type: 'error'
  //         })
  //       }
  //     }
  //   })
  // }

  // !start from here
  const handleLogin = async (formVal) => {
    // console.log(formVal);
    // console.log(isLoginForm);

    try {
      if (isLoginForm) {
        //! send login Information
        // console.log(formVal.email, formVal.password);

        const LoginData = { Email: formVal.email, Password: formVal.password };

        const response = await axios.post(
          `http://localhost:5000/api/user/login`,
          LoginData
        );

        if (response.status == 200) {
          const userTkn = response.data.token;
          localStorage.setItem("token", userTkn);
          toast.success(response.data.message);

          if (response.data.role == "user") {
            navigate("/user/home");
          }

          if (response.data.role == "admin") {
            navigate("/admin");
          }
        }
      } else {
        //! sen register information
        console.log("this is from register", formVal);
        const RegisterData = {
          Name: formVal.name,
          Email: formVal.email,
          Password: formVal.password,
          Nic_no: formVal.nic,
          Mobile_no: formVal.phone_number,
        };

        const response = await axios.post(
          `http://localhost:5000/api/user/register`,
          RegisterData
        );

        if (response.status == 200) {
          toast.success(response.data.message);
          console.log(response.data);
        }
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
    return;
  }, [isAdmin, isAuthenticated, navigate]);

  return (
    <div className="h-screen">
      <ToastContainer />
      <CommonNotification ref={notificationRef}>
        <div className="flex flex-row items-start justify-center h-full">
          <div
            className={`w-full lg:w-1/3 xl:w-1/3 pt-[3rem] md:pt-[1rem] ${
              isLoginForm ? "lg:pt-[12rem]" : "lg:pt-[6rem]"
            } bg-loginMobile lg:bg-none h-screen bg-contain bg-no-repeat bg-bottom  transition-all `}
          >
            <LoadingAnimation
              loading={loading}
              tip={
                isLoginForm ? data.signInLoadingText : data.signUpLoadingText
              }
            >
              <Title className="text-center lg:hidden py-[2rem] md:pt-[1rem] md:pb-0 track-wider login-title-mobile decoration-sky-500 underline whitespace-nowrap">
                {data.title}
              </Title>
              <div className="p-5 lg:p-8 xl:p-12  2xl:px-20 2xl:py-6 mx-2">
                <Title level={1} className="text-center">
                  {isLoginForm ? data.signInText : data.signUpText}
                </Title>

                <div className="w-fit mx-auto">
                  <Switch
                    defaultChecked
                    checkedChildren={data.signUpText}
                    unCheckedChildren={data.signInText}
                    checked={isLoginForm}
                    onChange={() => {
                      setIsLoginForm(!isLoginForm);
                      formRef?.current?.resetFields();
                    }}
                    loading={false}
                    className="bg-blue-600 hover:bg-blue-600"
                    disabled={loading}
                  />
                </div>

                {/* form */}
                <CommonForm
                  fields={data.fields}
                  formBtnText={isLoginForm ? data.signInText : data.signUpText}
                  type={isLoginForm ? "signIn" : "signUp"}
                  requiredMark={false}
                  ref={formRef}
                  onSubmit={handleLogin}
                  itemClassName="mb-2"
                  customComponent={isLoginForm && <ForgetPassword />}
                />
              </div>
            </LoadingAnimation>
          </div>
          <div className="w-full lg:w-2/3 xl:w-2/3 hidden lg:block bg-login-custom h-screen">
            <Title className="text-center xl:pt-[10rem] 2xl:pt-[12rem] lg:pt-[18rem] lg:lg-login-title xl:xl-login-title 2xl:login-title">
              {data.title}
            </Title>
          </div>
        </div>
      </CommonNotification>
    </div>
  );
};

export default Login;
