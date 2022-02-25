import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { UsersTableData } from "../../components/UsersTableData";
import { HeaderText } from "../../components/HeaderText";
import { AddButton } from "../../components/AddButton";
import { Modal } from "../../components/Modal";
import { InputBox } from "../../components/InputBox";
import {
  errorMessage,
  validateEmail,
  validateInputs,
  backendApi,
} from "../../utils";
import { NoData } from "../../components/NoData";
import {
  selectUserStatus,
  selectSignUpResponse,
  authSignUp,
  clearResponse,
} from "../../features/slices/authSlice";
import { Alert } from "../../components/Alert";
import ButtonLoader from "../../components/loader/ButtonLoader";
import { DialogModal } from "../../components/DialogModal";
import { Preloader } from "../../components/loader/Preloader";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
};

const Admins = () => {
  const [openModal, setOpenModal] = useState(false);
  const [inputDetails, setInputDetails] = useState(initialState);
  const [inputState, setInputState] = useState({});
  const [inValidEmail, setInvalidEmail] = useState(false);
  const [allAdmin, setAllAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState({
    open: false,
    type: "",
    message: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const dispatch = useDispatch();

  //Selectors
  const statusUser = useSelector(selectUserStatus);
  const response = useSelector(selectSignUpResponse);

  // Get all admin
  useEffect(() => {
    (async () => {
      let response;
      try {
        const data = await axios.get(`${backendApi()}/admin`);
        response = data.data;
      } catch (error) {
        response = error.response.data;
      }

      if (response.statusCode === 200) {
        setAllAdmin(response.data.users);
      }
    })();
    return () => {
      setAllAdmin(null);
    };
  }, []);

  // Check status for all admin
  useEffect(() => {
    if (statusUser === "loading") {
      setLoading(true);
    }
    if (statusUser === "succeeded") {
      switch (response.statusCode) {
        case 201:
          setOpenAlert({
            open: true,
            type: "success",
            message: `Your have resgistered successfully. 
            Please tell the owner to check his/her  email to activate the account`,
          });

          setAllAdmin(response.data);

          setInputDetails(initialState);
          setOpenModal(false);
          break;
        case 400:
          setOpenAlert({
            open: true,
            type: "error",
            message: response.message,
          });
          break;

        default:
          break;
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

  // Change inputs
  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    setInputDetails({ ...inputDetails, [name]: value });
    setInputState(false);
    setInvalidEmail(false);
  };

  // Send data to the backend
  const sendData = (e) => {
    e.preventDefault();

    if (validateInputs(inputDetails, setInputState, inputState)) return false;
    if (validateEmail(inputDetails.email)) return setInvalidEmail(true);

    const verificationUrl = `${window.location.origin}/Activation`;

    const data = { ...inputDetails, verificationUrl };

    dispatch(authSignUp({ ...data }));
  };

  // Delete user function
  const deleteUser = async () => {
    let response;
    try {
      const data = await axios.delete(`${backendApi()}/admin/${deleteId}`);
      response = data.data;
    } catch (error) {
      response = error.response.data;
    }

    if (response.statusCode === 200) {
      setOpenAlert({
        open: true,
        type: "success",
        message: `You have successfully deleted the account.`,
      });
      // setAllAdmin(filter(deleteId, allAdmin));
      const all = allAdmin.filter((datas) => datas.id !== deleteId);
      setAllAdmin(all);

      setOpenDialog(false);
    } else {
      setOpenAlert({
        open: true,
        type: "error",
        message: response.message,
      });
    }
  };

  // Function for dialog
  const openDialogAndSetId = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  return (
    <div>
      <HeaderText text="All Admin" />

      {!allAdmin ? (
        <Preloader />
      ) : (
        <>
          {openAlert.open && (
            <Alert
              type={openAlert.type}
              message={openAlert.message}
              closeFunction={() => setOpenAlert({ ...openAlert, open: false })}
            />
          )}

          <AddButton
            link="#"
            name=" Add Admin"
            onClick={() => setOpenModal(true)}
          />

          <div className="mt-8">
            <div className="overflow-x-auto">
              <div className="min-w-screen flex items-center justify-center font-sans">
                <div className="w-full">
                  {allAdmin?.length ? (
                    <table className="min-w-max w-full table-auto shadow-md rounded bg-white">
                      <thead>
                        <tr className="bg-indigo-100 text-indigo-700 uppercase text-xs leading-normal shadow-md rounded">
                          <th className="py-3 px-6 text-left">
                            Admin full Name
                          </th>
                          <th className="py-3 px-6 text-left">Admin Phone</th>
                          <th className="py-3 px-6 text-center">Admin Email</th>
                          <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-xs font-light">
                        {allAdmin.map((data) => (
                          <UsersTableData
                            key={data.id}
                            link={`/Admins/SingleAdmin/${data.id}`}
                            fullName={`${data.firstName} ${data.lastName}`}
                            phoneNumber={data.phoneNo}
                            email={data.email}
                            customerId={data.id}
                            deleteUser={openDialogAndSetId}
                          />
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <NoData message="No Admin Yet" />
                  )}
                </div>
              </div>
            </div>
          </div>
          {openModal && (
            <Modal setModal={() => setOpenModal(false)}>
              {openAlert.open && (
                <Alert
                  type={openAlert.type}
                  message={openAlert.message}
                  closeFunction={() =>
                    setOpenAlert({ ...openAlert, open: false })
                  }
                />
              )}
              <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                <div className="col-span-full sm:col-span-3">
                  <InputBox
                    name="firstname"
                    value={inputDetails.firstname}
                    onChange={onChangeInputs}
                    title="First Name"
                    type="text"
                    placeholder="Enter your FirstName"
                  />
                  {inputState.firstname && errorMessage("First name is needed")}
                </div>
                <div className="col-span-full sm:col-span-3">
                  <InputBox
                    name="lastname"
                    value={inputDetails.lastname}
                    onChange={onChangeInputs}
                    title="Last Name"
                    type="text"
                    placeholder="Enter your lastName"
                  />
                  {inputState.lastname && errorMessage("Last name is needed")}
                </div>
                <div className="col-span-full sm:col-span-3">
                  <InputBox
                    name="email"
                    value={inputDetails.email}
                    onChange={onChangeInputs}
                    title="Email"
                    type="email"
                    placeholder="Enter your Email"
                  />
                  {inputState.email && errorMessage("Email is needed")}
                  {inValidEmail && errorMessage("Incorrect Email Format")}
                </div>
                <div className="col-span-full sm:col-span-3">
                  <InputBox
                    name="password"
                    value={inputDetails.password}
                    onChange={onChangeInputs}
                    title="Password"
                    type="password"
                    placeholder="Enter your Password"
                  />
                  {inputState.password && errorMessage("Password is needed")}
                </div>
              </div>
              <button
                className="text-blue-600 bg-blue-200 text-xs p-2 mt-3 rounded"
                onClick={sendData}
                disabled={loading}
              >
                {!loading ? "Add Admin" : <ButtonLoader />}
              </button>
            </Modal>
          )}

          <DialogModal
            type="error"
            subQuestion={`Do you really want to delete this account ?
                      This process cannot be undone`}
            buttonName="Delete"
            open={openDialog}
            cancelAction={() => setOpenDialog(false)}
            mainAction={deleteUser}
          />
        </>
      )}
    </div>
  );
};

export default Admins;
