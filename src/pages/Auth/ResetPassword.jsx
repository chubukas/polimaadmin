import { Link, Redirect, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FormLayout } from "../../components/FormLayout";
import { InputBox } from "../../components/InputBox";
import { errorMessage, validateInputs } from "../../utils";
import {
  selectUserStatus,
  selectResponse,
  userResetPassword,
  clearResponse,
} from "../../features/slices/authSlice";
import ButtonLoader from "../../components/loader/ButtonLoader";
import { backendApi } from "../../utils";
import { Alert } from "../../components/Alert";
import { Preloader } from "../../components/loader/Preloader";

const initialState = {
  password: "",
  confirmPassword: "",
};

const ResetPassword = () => {
  const [inputDetails, setInputDetails] = useState(initialState);
  const [inputState, setInputState] = useState({});
  const [changeState, setChangeState] = useState({ message: "", status: null });
  const [misMatchPassword, setMisMatchPassword] = useState(false);
  const [redirectTo, setRedirectTo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState({
    open: false,
    type: "",
    message: "",
  });

  const dispatch = useDispatch();

  const { resetToken } = useParams();

  //Selectors
  const statusUser = useSelector(selectUserStatus);
  const response = useSelector(selectResponse);

  // Check if reset token is valid
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${backendApi()}/admin/checkResetToken/${resetToken}`
      );
      const data = await response.json();

      if (data.status === "fail")
        return setChangeState({ message: data.message, status: true });

      setChangeState({ message: "", status: false });
    })();
  }, [resetToken]);

  // Check status
  useEffect(() => {
    if (statusUser === "loading") {
      setLoading(true);
    }
    if (statusUser === "succeeded") {
      if (response.statusCode === 200) {
        setOpenAlert({
          open: true,
          type: "success",
          message: response.message,
        });
        setInputDetails(initialState);
        setTimeout(() => {
          setRedirectTo(true);
        }, 1000);
      } else {
        setOpenAlert({
          open: true,
          type: "error",
          message: response.message,
        });
      }
      setLoading(false);
    }
  }, [statusUser, response]);

  // Clean response on unmout
  useEffect(() => {
    return () => {
      dispatch(clearResponse());
    };
  }, [dispatch]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputDetails({ ...inputDetails, [name]: value });
    setInputState(false);
    setMisMatchPassword(false);
  };

  const submitData = (e) => {
    e.preventDefault();
    if (validateInputs(inputDetails, setInputState, inputState)) return false;
    if (inputDetails.password !== inputDetails.confirmPassword)
      return setMisMatchPassword(true);

    const data = { ...inputDetails, resetToken };

    dispatch(userResetPassword(data));
  };

  return (
    <>
      {changeState.status === null && <Preloader />}
      {changeState.status === true && (
        <div className="min-h-screen flex items-center bg-white">
          <div className="container mx-auto p-4 flex flex-wrap items-center">
            <div className="w-full md:w-5/12 text-center p-4">
              <img src="/images/error.png" alt="error icon" />
            </div>
            <div className="w-full md:w-7/12 text-center md:text-left p-4">
              <div className="errorRed">
                <div className="text-6xl font-medium">Error</div>
                <div className="text-xl md:text-3xl font-medium my-4">
                  <p>{changeState.message}</p>
                </div>
                <div className="mb-8">
                  <p>
                    No worries, you can reset your password with the button
                    below
                  </p>
                </div>
                <Link
                  to="/forgotPassword"
                  className="border border-red-600 rounded py-2 px-6"
                >
                  Forgot password
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {changeState.status === false && (
        <FormLayout>
          {redirectTo && <Redirect to="/" />}
          <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-md bg-white mt-4">
            {openAlert.open && (
              <Alert
                type={openAlert.type}
                message={openAlert.message}
                closeFunction={() =>
                  setOpenAlert({ ...openAlert, open: false })
                }
              />
            )}
            <h1 className="text-2xl font-bold text-center">
              Reset Your Password
            </h1>
            <div className="space-y-6">
              <div className="space-y-1 text-sm">
                <InputBox
                  type="password"
                  name="password"
                  placeholder="Enter your new password"
                  value={inputDetails.password}
                  onChange={onChange}
                  title="New Password"
                />
                {inputState.password && errorMessage("Password is required")}
              </div>

              <div className="space-y-1 text-sm">
                <InputBox
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your new password"
                  value={inputDetails.confirmPassword}
                  onChange={onChange}
                  title="Confirm Password"
                />
                {inputState.confirmPassword &&
                  errorMessage("Please confirm your password")}
              </div>
              {misMatchPassword &&
                errorMessage("Mismatched password: Please input the password")}
              <div className="flex justify-center my-6">
                <button
                  className="form-btn px-8 py-1"
                  disabled={loading}
                  onClick={submitData}
                >
                  {!loading ? "Send" : <ButtonLoader />}
                </button>
              </div>
            </div>

            <p className="text-xs text-center sm:px-6 text-gray-500">
              Don't have an account? Tell admin to register you.
              <Link
                to="/"
                className="underline mx-2 font-semibold text-gray-500 hover:text-gray-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </FormLayout>
      )}
    </>
  );
};

export default ResetPassword;
