import { Link, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FormLayout } from "../../components/FormLayout";
import { errorMessage, validateInputs } from "../../utils";
import { Alert } from "../../components/Alert";
import {
  loginUser,
  selectUserStatus,
  selectIsAuthenticated,
  selectLoginResponse,
  clearResponse,
} from "../../features/slices/authSlice";
import ButtonLoader from "../../components/loader/ButtonLoader";

const initialState = {
  email: "",
  password: "",
};

export const Login = () => {
  const [inputDetails, setInputDetails] = useState(initialState);
  const [inputState, setInputState] = useState({});
  const [openAlert, setOpenAlert] = useState({ open: false, message: "" });
  const [redirectTo, setRedirectTo] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const statusUser = useSelector(selectUserStatus);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const response = useSelector(selectLoginResponse);

  useEffect(() => {
    if (isAuthenticated) {
      setRedirectTo(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (statusUser === "loading") {
      setLoading(true);
    }
    if (statusUser === "succeeded") {
      if (isAuthenticated) {
        setRedirectTo(true);
        setInputDetails(initialState);
      } else if (response.status === "fail") {
        response.message &&
          setOpenAlert({
            open: true,
            message: response.message,
          });
      }
      setLoading(false);
    }
  }, [statusUser, isAuthenticated, response]);

  // Clean response on unmout
  useEffect(() => {
    return () => {
      dispatch(clearResponse());
    };
  }, [dispatch]);

  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    setInputDetails({ ...inputDetails, [name]: value });
    setInputState(false);
  };

  const submitData = (e) => {
    e.preventDefault();
    if (validateInputs(inputDetails, setInputState, inputState)) return false;
    dispatch(loginUser(inputDetails));
  };

  return (
    <FormLayout>
      {redirectTo && <Redirect to="/Dashboard" />}
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-md bg-white mt-4">
        {openAlert.open && (
          <Alert
            type="error"
            message={openAlert.message}
            closeFunction={() => setOpenAlert(false)}
          />
        )}
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form className="space-y-6">
          <div className="space-y-1 text-sm">
            <label htmlFor="username" className="block text-blue-800">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="form-inputs-designs"
              onChange={onChangeInputs}
              value={inputDetails.email}
            />
            {inputState.email && errorMessage("Email is needed")}
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block text-blue-800">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="form-inputs-designs"
              onChange={onChangeInputs}
              value={inputDetails.password}
            />
            {inputState.password && errorMessage("Password is needed")}
            <div className="flex justify-end text-xs text-gray-500 hover:text-gray-700">
              <Link to="/forgotPassword">Forgot Password?</Link>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="form-btn px-8 py-1"
              onClick={submitData}
              disabled={loading}
            >
              {!loading ? "Sign in" : <ButtonLoader />}
            </button>
          </div>
        </form>
        <p className="text-xs text-center sm:px-6 text-gray-500">
          Don't have an account? Tell admin to register you
          {/* <Link
            to="/signUp"
            className="underline mx-2 font-semibold text-gray-500 hover:text-gray-700"
          >
            Sign up
          </Link> */}
        </p>
      </div>
    </FormLayout>
  );
};
