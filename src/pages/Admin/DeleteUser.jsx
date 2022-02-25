import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Alert } from "../../components/Alert";
import { DialogModal } from "../../components/DialogModal";
import {
  userActions,
  selectUpdateUserResponse,
  userUpdateStatus,
  resetStatedata,
} from "../../features/reducers/userReducer";
import ButtonLoader from "../../components/loader/ButtonLoader";
import { authSignOut } from "../../features/slices/authSlice";

export const DeleteUser = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState({
    open: false,
    type: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const userUdateResponse = useSelector(selectUpdateUserResponse);
  const userStatus = useSelector(userUpdateStatus);

  // Check status
  useEffect(() => {
    if (userStatus === "loading") {
      setLoading(true);
    }
    if (userStatus === "succeeded") {
      if (userUdateResponse.statusCode === 200) {
        dispatch(authSignOut());
      } else {
        setOpenAlert({
          open: true,
          type: "error",
          message: userUdateResponse.message,
        });
      }
      setLoading(false);
    }
  }, [userStatus, userUdateResponse, dispatch]);

  // Clean up
  useEffect(() => {
    return () => {
      dispatch(resetStatedata());
    };
  }, [dispatch]);

  return (
    <>
      <DialogModal
        type="error"
        subQuestion={`Do you really want to delete your account?
                      This process cannot be undone`}
        buttonName="Delete"
        open={openModal}
        cancelAction={() => setOpenModal(false)}
        mainAction={() => dispatch(userActions({ action: "deleteUser" }))}
      />
      {openAlert.open && (
        <Alert
          type={openAlert.type}
          message={openAlert.message}
          closeFunction={() => setOpenAlert({ ...openAlert, open: false })}
        />
      )}
      <div>
        <div className="font-semibold text-red-500">
          <p>Delete Your Account</p>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="relative px-16 py-4 mt-6 overflow-hidden font-semibold rounded bg-red-800 text-red-50 hover:bg-red-700"
          onClick={() => setOpenModal(true)}
          disabled={loading}
        >
          {!loading ? "Delete User" : <ButtonLoader />}
          <span className="absolute top-0 right-0 px-5 py-1 text-xs tracking-wider text-center uppercase whitespace-no-wrap origin-bottom-left transform rotate-45 -translate-y-full translate-x-1/3 bg-red-600">
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </button>
      </div>
    </>
  );
};
