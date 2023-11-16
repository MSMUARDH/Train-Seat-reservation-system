import { useState, useRef, useEffect } from "react";
import { CommonForm } from "../../components";
import data from "../../data/components/payment";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import LoadingAnimation from "../../components/elements/LoadingAnimation";
import { Result, Button, Statistic } from "antd";
import handleApiCall from "../../api/handleApiCall";
import CommonNotification from "../../components/common/CommonNotification";
import axios from "axios";
import { useNavigate } from "react-router";
import QRCode from "qrcode";
import { useDispatch, useSelector } from "react-redux";

const Payment = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // const [seatSelection, setSeatSelection] = useState(null);
  // const [trainDetails, setTrainDetails] = useState(null);
  const [imageUrl, setImageUrl] = useState();
  const [enteredCardNumber, setEnteredCardNumber] = useState({
    cardType: "",
    fullName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  //!testing

  const seatSelection = JSON.parse(localStorage.getItem("SEAT_SELECTION"));
  const trainDetails = JSON.parse(localStorage.getItem("TRAIN_SELECTION"));

  //! /////

  // ! generate QR code  -  testing

  const genarateQrCode = async (data) => {
    try {
      console.log("data from qr code genarator", data);

      const response = await QRCode.toDataURL(JSON.stringify(data));

      const qrUpdatedResponse = await axios.patch(
        `http://localhost:5000/api/user/upadte-user-ticket/${data.UserId}/${data.PNRNo}`,
        { imageUrl: response }
      );

      setImageUrl(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  //!

  const [isLoading, setIsLoading] = useState(false);
  const [isFinalStep, setIsFinalStep] = useState(false);
  const { Countdown } = Statistic;
  const notificationRef = useRef(null);
  if (isFinalStep)
    return (
      <Result
        status="success"
        title={<h1>Successfully Purchased Train tickets!</h1>}
        subTitle="Please check your email for more information."
        extra={
          <div>
            <Button
              icon={<BsFillArrowLeftCircleFill className="text-sky-600 mt-1" />}
              // onClick={() => genarateQrCode()}
            >
              Go to search
            </Button>

            {imageUrl ? (
              <a
                href={imageUrl}
                download
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img src={imageUrl} alt="img" />
              </a>
            ) : null}
            <div className="text-[0.8rem] mt-6">
              You will redirect to search within{" "}
              <Countdown
                format="ss"
                value={Date.now() + 5 * 1000}
                onFinish={() => navigate("/user/home")}
              />
            </div>
          </div>
        }
      />
    );
  return (
    <LoadingAnimation
      loading={isLoading}
      tip="Making payment , don't refresh the page!"
      className={`payment-loader ${isLoading && "bg-[#F8FAFC]/70"}`}
    >
      <CommonNotification ref={notificationRef}>
        <div className="flex items-center justify-between h-[52vh] flex-wrap">
          <div className="w-full lg:w-1/3">
            {/* //! */}
            <div className="w-full mt-5 ml-2 p-6 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-0 dark:bg-gray-800 dark:border-gray-700">
              <p className=" text-base text-gray-500 sm:text-lg dark:text-gray-400">
                <p>Total LKR: {seatSelection?.totalFair}</p>
              </p>
            </div>
            {/* //! */}

            <CommonForm
              fields={data.fields}
              onValChangeCallback={(changedValues) => {
                setEnteredCardNumber({
                  ...enteredCardNumber,
                  ...changedValues,
                });
              }}
              onSubmit={async () => {
                console.log("entered card number", enteredCardNumber);

                try {
                  console.log("train from payment trainDetails", trainDetails);
                  console.log("train from payment seatDetails", seatSelection);

                  const data = {
                    enteredCardNumber,
                    trainDetails,
                    seatSelection,
                  };

                  console.log("data to post", data);

                  const response = await axios.post(
                    `http://localhost:5000/api/user/ticket-booking/${user}`,
                    data
                  );

                  console.log();

                  setIsLoading(true);

                  if (response.status == 200) {
                    setTimeout(() => {
                      setIsLoading(false);
                      notificationRef.current.openNotification({
                        message: "Payment Successful",
                        description: "Your reservation was successful",
                        type: "success",
                      });
                      // !testing
                      console.log(
                        "this is from successful payment",
                        response.data.data
                      );

                      const {
                        PNRNo,
                        TravalDate,
                        BookedSeatNo,
                        Origin,
                        ClassType,
                        UserId,
                        ScheduleId,
                      } = response.data.data;

                      const data = {
                        PNRNo,
                        TravalDate,
                        BookedSeatNo,
                        Origin,
                        ClassType,
                        UserId,
                        ScheduleId,
                      };

                      // genarateQrCode(JSON.stringify(response.data.data));
                      genarateQrCode(data);

                      localStorage.removeItem("SEAT_SELECTION");
                      localStorage.removeItem("TRAIN_SELECTION");

                      // Code to run after fully finishing 2 seconds
                    }, 2000);

                    setTimeout(() => {
                      setIsLoading(false);
                      setIsFinalStep(true);
                      // Code to run after fully finishing 2 seconds
                    }, 3000);

                    // setTimeout(() => {
                    //   setIsFinalStep(true);
                    // }, 2000);
                    // notificationRef.current.openNotification({
                    //   message: "Payment Successful",
                    //   description: "Your reservation was successful",
                    //   type: "success",
                    // });
                  }
                } catch (error) {
                  console.log(error);

                  setIsLoading(true);

                  setTimeout(() => {
                    setIsLoading(false);

                    // Code to run after fully finishing 2 seconds
                    notificationRef.current.openNotification({
                      message: "Invalid Payment Details",
                      description: "Please provide correct payment details!",
                      type: "error",
                    });
                  }, 3000);

                  // setTimeout(() => {
                  //   setIsLoading(true);
                  // }, 2000);
                  // setIsLoading(false);
                  // notificationRef.current.openNotification({
                  //   message: "Invalid Payment Details",
                  //   description: "Try again later",
                  //   type: "error",
                  // });
                }
              }}
              formItemClassName="w-full p-2 booking-form-item lg:h-[5.5rem]"
              className="flex lg:flex-row flex-wrap items-center justify-between"
              name="payment-form"
              formBtnText={data.formBtnText}
              btnWrapperClassName="w-full item-end lg:ml-auto lg:h-22 lg:h-[5.5rem] booking-form-item lg:pt-[1.93rem] px-2"
              btnClassName="lg:mt-auto"
            />
          </div>

          <div className="w-full lg:w-2/3 flex justify-center">
            <div
              id="card"
              className="relative w-96 h-60 rounded-2xl font-mono text-white overflow-hidden cursor-pointer transition-all duration-500"
              style={{ transition: "0.6s;transform-style: preserve-3d" }}
            >
              <div
                className="absolute top-0 left-0 w-full h-full flex flex-col shadow-sm justify-center gap-6 p-6 bg-gradient-to-tr from-gray-950 to-red-500 transition-all duration-100 delay-200 z-20"
                style={{ transform: "rotateY(0deg)" }}
              >
                <div className="flex justify-between items-center">
                  <img
                    src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
                    alt="Smart card"
                    className="w-12"
                  />

                  {enteredCardNumber.cardType === "VISA" ? (
                    <FaCcVisa
                      onClick={() => console.log("Visa Clicked")}
                      className="text-[2.5rem]"
                    />
                  ) : (
                    <FaCcMastercard
                      onClick={() => console.log("master Clicked")}
                      className="text-[2.5rem]"
                    />
                  )}
                </div>

                <div className="">
                  <input
                    type="text"
                    value={
                      enteredCardNumber?.cardNumber &&
                      String(enteredCardNumber?.cardNumber)
                        .match(/.{1,4}/g)
                        ?.join(" ")
                    }
                    readOnly
                    className="outline-none w-full bg-transparent text-center text-[1.25rem] font-mono lining-nums tracking-wider"
                  />
                </div>

                <div className="w-full flex flex-row justify-between">
                  <div className="w-full flex flex-col">
                    <label className="text-slate-300 font-light">
                      Card holder
                    </label>
                    <input
                      type="text"
                      value={enteredCardNumber.fullName}
                      readOnly
                      className="outline-none bg-transparent font-mono tracking-widest"
                    />
                  </div>

                  <div className="w-1/4 flex flex-col">
                    <label className="text-slate-300 font-light">Expires</label>
                    <input
                      type="text"
                      value={
                        enteredCardNumber?.expiry &&
                        String(enteredCardNumber.expiry).substring(0, 2) +
                          "/" +
                          String(enteredCardNumber.expiry).substring(2)
                      }
                      readOnly
                      className="outline-none bg-transparent font-mono tracking-widest"
                    />
                  </div>
                </div>
              </div>

              <div
                className="absolute top-0 left-0 w-full h-full flex flex-col gap-3 justify-center bg-gradient-to-tr from-gray-900 to-red-500 transition-all z-10"
                style={{ transform: "rotateY(180deg)" }}
              >
                <div className="w-full h-12 bg-black"></div>

                <div className="px-6 flex flex-col gap-6 justify-center">
                  <div className="flex flex-col items-end">
                    <label className="text-slate-300 font-light">CVV</label>
                    <input
                      type="text"
                      value="***"
                      readOnly
                      className="outline-none rounded text-black w-full h-8 text-right"
                      style={{
                        background:
                          "repeating-linear-gradient(45deg, #ededed, #ededed 5px, #f9f9f9 5px, #f9f9f9 10px)",
                      }}
                    />
                  </div>

                  <div className="flex justify-start items-center">
                    {enteredCardNumber.cardType === 1 ? (
                      <FaCcVisa className="text-[2.5rem]" />
                    ) : (
                      <FaCcMastercard className="text-[2.5rem]" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CommonNotification>
    </LoadingAnimation>
  );
};

export default Payment;
