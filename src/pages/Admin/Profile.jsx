import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Alert } from "../../components/Alert";
import { DatePicker } from "../../components/DatePicker";
import { InputBox } from "../../components/InputBox";
import { SelectBox } from "../../components/SelectBox";
import { TextArea } from "../../components/TextArea";
import { selectUser } from "../../features/slices/authSlice";
import { errorMessage, formData } from "../../utils";
import {
  userActions,
  selectUpdateUserResponse,
  userUpdateStatus,
  resetStatedata,
} from "../../features/reducers/userReducer";
import ButtonLoader from "../../components/loader/ButtonLoader";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  Address: "",
  phoneNo: "",
  birthday: "",
  gender: "",
  city: "",
  state: "",
  country: "",
};

const Profile = () => {
  const [inputDetails, setInputDetails] = useState(initialState);
  const [incorrectDetails, setInCorrectDetail] = useState(false);
  const [openAlert, setOpenAlert] = useState({
    open: false,
    type: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const userUdateResponse = useSelector(selectUpdateUserResponse);
  const userStatus = useSelector(userUpdateStatus);

  const user = useSelector(selectUser);

  useEffect(() => {
    setInputDetails({
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      email: user.email ?? "",
      Address: user.Address ?? "",
      phoneNo: user.phoneNo ?? "",
      city: user.city ?? "",
      state: user.state ?? "",
      country: user.country ?? "",
      birthday: user.birthday ?? "",
      gender: user.gender ?? "",
    });
  }, [user]);

  // Check status
  useEffect(() => {
    if (userStatus === "loading") {
      setLoading(true);
    }
    if (userStatus === "succeeded") {
      if (userUdateResponse.statusCode === 200) {
        setOpenAlert({
          open: true,
          type: "success",
          message: userUdateResponse.message,
        });
      } else {
        setOpenAlert({
          open: true,
          type: "error",
          message: userUdateResponse.message,
        });
      }
      setLoading(false);
    }
  }, [userStatus, userUdateResponse]);

  // Clean up
  useEffect(() => {
    return () => {
      dispatch(resetStatedata());
    };
  }, [dispatch]);

  // Change Inputs
  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    setInputDetails({ ...inputDetails, [name]: value });
    setInCorrectDetail(false);
  };

  // Submit Data
  const submitData = (e) => {
    e.preventDefault();
    if (inputDetails.email !== user.email)
      return setInCorrectDetail({ email: true });

    let data = formData(inputDetails);

    data = { data, action: "updateUser" };

    dispatch(userActions(data));
  };

  return (
    <>
      <div>
        <div className="md:max-w-4xl">
          {openAlert.open && (
            <Alert
              type={openAlert.type}
              message={openAlert.message}
              closeFunction={() => setOpenAlert({ ...openAlert, open: false })}
            />
          )}

          <div className="flex justify-center">
            <h1 className="text-blue-800 font-bold font-sans text-2xl">
              Update Your Profile
            </h1>
          </div>

          <form
            encType="multipart/form-data"
            className="py-4 rounded-xl bg-white font-sans"
          >
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <InputBox
                  name="firstName"
                  value={inputDetails.firstName}
                  onChange={onChangeInputs}
                  title="First Name"
                  type="text"
                  placeholder="Enter your FirstName"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <InputBox
                  name="lastName"
                  value={inputDetails.lastName}
                  onChange={onChangeInputs}
                  title="Last Name"
                  type="text"
                  placeholder="Enter your lastName"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <InputBox
                  name="email"
                  value={inputDetails.email}
                  onChange={onChangeInputs}
                  title="Email"
                  type="email"
                  placeholder="Enter your Email"
                  disabled
                />
                {incorrectDetails &&
                  errorMessage("You are not allow to edit your email")}
              </div>
              <div className="col-span-full sm:col-span-3">
                <InputBox
                  name="phoneNo"
                  value={inputDetails.phoneNo}
                  onChange={onChangeInputs}
                  title="Phone Number"
                  type="phone"
                  placeholder="Enter your Phone Number"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <DatePicker
                  name="birthday"
                  value={inputDetails.birthday}
                  onChange={onChangeInputs}
                  title="Birthday"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <SelectBox
                  name="gender"
                  value={inputDetails.gender}
                  onChange={onChangeInputs}
                  title="Gender"
                  optionArray={["Male", "Female"]}
                />
              </div>
              <div className="col-span-full sm:col-span-6">
                <TextArea
                  name="Address"
                  value={inputDetails.Address}
                  onChange={onChangeInputs}
                  title="Address"
                  placeholder="Enter your Address"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <InputBox
                  name="city"
                  value={inputDetails.city}
                  onChange={onChangeInputs}
                  title="City"
                  type="text"
                  placeholder="Enter your city"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <InputBox
                  name="state"
                  value={inputDetails.state}
                  onChange={onChangeInputs}
                  title="State / Province"
                  type="text"
                  placeholder="Enter your state / province"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <InputBox
                  name="country"
                  value={inputDetails.country}
                  onChange={onChangeInputs}
                  title="Country"
                  type="text"
                  placeholder="Enter your country"
                />
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
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
