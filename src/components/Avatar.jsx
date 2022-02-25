import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectUser } from "../features/slices/authSlice";
import { Modal } from "./Modal";
import { DisplayAddedImages } from "../components/DisplayAddedImages";
import { UploadImage } from "../components/UploadImage";
import { errorMessage, formData } from "../utils";
import {
  userActions,
  selectUpdateUserResponse,
  userUpdateStatus,
  resetStatedata,
} from "../features/reducers/userReducer";
import ButtonLoader from "../components/loader/ButtonLoader";
import { Alert } from "../components/Alert";
import { storageDecryptedData } from "../utils/dataSecurity";
import { USERDATA } from "../utils/GetterSetter";

const Avatar = ({ show }) => {
  const [inputDetails, setInputDetails] = useState(null);
  const [openModal, setopenModal] = useState(false);
  const [images, setImages] = useState({ avatar: [], imageError: "" });
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState({
    open: false,
    type: "",
    message: "",
  });

  const user = useSelector(selectUser);
  const userUdateResponse = useSelector(selectUpdateUserResponse);
  const userStatus = useSelector(userUpdateStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    user && setInputDetails(JSON.parse(user?.avatar) ?? null);
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

        const realAvatar = JSON.parse(storageDecryptedData(USERDATA));
        realAvatar.avatar &&
          setInputDetails(JSON.parse(realAvatar.avatar) ?? null);

        setTimeout(() => {
          setopenModal(false);
        }, 1000);
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
      setInputDetails(null);
    };
  }, [dispatch]);

  // Upload file
  const onFileUpload = (e) => {
    const { files, name } = e.target;
    setImages({ ...images, [name]: [...files] });
  };

  // Remove Image
  const removeImage = (e) => {
    let temp = images.avatar;
    temp.splice(e, 1);
    setImages({ avatar: temp });
  };

  const updateAvatar = () => {
    if (images.avatar.length < 1)
      return setImages({
        ...images,
        imageError: `You must add a picture before updating`,
      });

    if (images.avatar.length > 1)
      return setImages({
        ...images,
        imageError: `Profile Image cannot be more than one, Delete any ${
          images.avatar.length - 1
        } of your choice`,
      });

    const avatar = images.avatar;

    let data = formData("", avatar, "avatar");
    // for (let p of data.entries()) {
    //   console.log(p[0] + " : " + p[1]);
    // }

    data = { data, action: "updateUser" };

    dispatch(userActions(data));
  };

  return (
    <div className="relative">
      <img
        className="h-8 w-8 rounded-full"
        src={
          inputDetails ? inputDetails[0].fileName : "/images/imageholder.png"
        }
        alt="avatar"
      />
      {show && (
        <div className="text-xs mt-1 absolute">
          <button onClick={() => setopenModal(true)}>change</button>
        </div>
      )}
      {openModal && (
        <Modal setModal={() => setopenModal(false)}>
          {openAlert.open && (
            <Alert
              type={openAlert.type}
              message={openAlert.message}
              closeFunction={() => setOpenAlert({ ...openAlert, open: false })}
            />
          )}
          <div className="grid grid-row-1 sm:grid-cols-2 gap-y-8">
            <UploadImage onFileUpload={onFileUpload} name="avatar" />

            {images.avatar && (
              <DisplayAddedImages
                imagesArray={images.avatar}
                removeImage={removeImage}
              />
            )}
          </div>
          {images.imageError && errorMessage(images.imageError)}
          <div className="flex justify-center my-6">
            <button
              type="submit"
              className="form-btn px-8 py-1"
              onClick={updateAvatar}
              disabled={loading}
            >
              {!loading ? "Update" : <ButtonLoader />}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Avatar;
