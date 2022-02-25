import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { InputBox } from "../../components/InputBox";
import { FormLayout } from "../../components/FormLayout";
import { errorMessage, validateEmail } from "../../utils";
import { Alert } from "../../components/Alert";
import {
  selectUserStatus,
  selectResponse,
  userForgotPassword,
  clearResponse,
} from "../../features/slices/authSlice";
import ButtonLoader from "../../components/loader/ButtonLoader";

import { selectIsAuthenticated } from "../../features/slices/authSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [incorrectDetails, setInCorrectDetail] = useState({
    error: false,
    empty: false,
  });
  const [openAlert, setOpenAlert] = useState({
    open: false,
    type: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [redirectTo, setRedirectTo] = useState(false);

  const dispatch = useDispatch();

  //Selectors
  const statusUser = useSelector(selectUserStatus);
  const response = useSelector(selectResponse);

  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Check status
  useEffect(() => {
    if (isAuthenticated) {
      setRedirectTo(true);
    } else {
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
          setEmail("");
        } else if (response.status === "fail") {
          setOpenAlert({
            open: true,
            type: "error",
            message: response.message,
          });
        }
        setLoading(false);
      }
    }
  }, [statusUser, response, isAuthenticated, dispatch]);

  // Clean response on unmout
  useEffect(() => {
    return () => {
      dispatch(clearResponse());
    };
  }, [dispatch]);

  const onChange = (e) => {
    setEmail(e.target.value);
    setInCorrectDetail(false);
  };

  const SendData = () => {
    if (email === "")
      return setInCorrectDetail({ ...incorrectDetails, empty: true });
    if (validateEmail(email))
      return setInCorrectDetail({ ...incorrectDetails, error: true });

    const emailResetUrl = `${window.location.origin}/resetPassword`;

    const data = { email, emailResetUrl };

    dispatch(userForgotPassword({ ...data }));
  };

  return (
    <FormLayout>
      {redirectTo && <Redirect to="/Dashboard" />}
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-md bg-white mt-4">
        {openAlert.open && (
          <Alert
            type={openAlert.type}
            message={openAlert.message}
            closeFunction={() => setOpenAlert({ ...openAlert, open: false })}
          />
        )}
        <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
        <div className="space-y-6">
          <div className="space-y-1 text-sm">
            <InputBox
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={onChange}
            />
            {incorrectDetails.empty && errorMessage("Please enter your email")}
            {incorrectDetails.error &&
              errorMessage("Please enter a valid email")}
          </div>
          <div className="flex justify-center">
            <button
              className="form-btn px-8 py-1"
              disabled={loading}
              onClick={SendData}
            >
              {!loading ? "Send email" : <ButtonLoader />}
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
  );
};

export default ForgotPassword;
