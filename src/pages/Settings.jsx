import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Alert } from "../components/Alert";
import { errorMessage, validateInputs } from "../utils";
import { InputBox } from "../components/InputBox";
import {
  updatePassword,
  selectRPasswordResponse,
  userUpdateStatus,
  resetStatedata,
} from "../features/reducers/userReducer";
import ButtonLoader from "../components/loader/ButtonLoader";
// import { DeleteUser } from "./Admin/DeleteUser";
import { HeaderText } from "../components/HeaderText";

const initialState = {
  oldpassword: "",
  newpassword: "",
  confirmNewPassword: "",
};

const Settings = () => {
  const [inputDetails, setInputDetails] = useState(initialState);
  const [passwordMisMatched, setPasswordMisMatched] = useState(false);
  const [inputState, setInputState] = useState({});
  const [openAlert, setOpenAlert] = useState({
    open: false,
    type: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const passwordResponse = useSelector(selectRPasswordResponse);
  const userStatus = useSelector(userUpdateStatus);

  // Check status
  useEffect(() => {
    if (userStatus === "loading") {
      setLoading(true);
    }
    if (userStatus === "succeeded") {
      if (passwordResponse.statusCode === 200) {
        setOpenAlert({
          open: true,
          type: "success",
          message: passwordResponse.message,
        });
        setInputDetails(initialState);
      } else {
        setOpenAlert({
          open: true,
          type: "error",
          message: passwordResponse.message,
        });
      }
      setLoading(false);
    }
  }, [userStatus, passwordResponse]);

  useEffect(() => {
    return () => {
      dispatch(resetStatedata());
    };
  }, [dispatch]);

  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    setInputDetails({ ...inputDetails, [name]: value });
    setInputState(false);
    setPasswordMisMatched(false);
  };

  const submitData = (e) => {
    e.preventDefault();
    if (validateInputs(inputDetails, setInputState, inputState)) return false;
    if (inputDetails.newpassword !== inputDetails.confirmNewPassword)
      return setPasswordMisMatched(true);

    dispatch(updatePassword({ ...inputDetails }));
  };

  return (
    <div>
      <HeaderText text="Settings" />
      <div>
        {openAlert.open && (
          <Alert
            type={openAlert.type}
            message={openAlert.message}
            closeFunction={() => setOpenAlert({ ...openAlert, open: false })}
          />
        )}
        <div className="font-semibold text-blue-800">
          <p>Change Your Password</p>
        </div>

        <div className="md:max-w-4xl">
          <div className="py-4 rounded-xl bg-white font-sans">
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-2">
                <InputBox
                  name="oldpassword"
                  onChange={onChangeInputs}
                  value={inputDetails.oldpassword}
                  type="password"
                  placeholder="Enter oldPassword"
                  title="Old Password"
                />
                {inputState.oldpassword &&
                  errorMessage("Enter your old password")}
              </div>
              <div className="col-span-full sm:col-span-2">
                <InputBox
                  name="newpassword"
                  onChange={onChangeInputs}
                  value={inputDetails.newpassword}
                  type="password"
                  placeholder="Enter newpassword"
                  title="New Password"
                />
                {inputState.newpassword &&
                  errorMessage("Enter your new password")}
              </div>
              <div className="col-span-full sm:col-span-2">
                <InputBox
                  name="confirmNewPassword"
                  onChange={onChangeInputs}
                  value={inputDetails.confirmNewPassword}
                  type="password"
                  placeholder="Confirm the  new password"
                  title="Confirm New Passsword"
                />
                {inputState.confirmNewpassword &&
                  errorMessage("Confirm your new password")}
              </div>
              {passwordMisMatched &&
                errorMessage("The passwords are mismatched")}
            </div>
          </div>
          <div className="flex justify-center my-6">
            <button
              type="submit"
              className="form-btn px-8 py-1"
              onClick={submitData}
              disabled={loading}
            >
              {!loading ? "Update" : <ButtonLoader />}
            </button>
          </div>
        </div>

        {/* <DeleteUser /> */}
      </div>
    </div>
  );
};

export default Settings;
