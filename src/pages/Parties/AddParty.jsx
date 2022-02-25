import { useState } from "react";

import { InputBox } from "../../components/InputBox";
import { errorMessage, validateInputs } from "../../utils";
import { UploadImage } from "../../components/UploadImage";
import { DisplayAddedImages } from "../../components/DisplayAddedImages";
import { Alert } from "../../components/Alert";

export const AddParty = () => {
  const initialDetails = {
    partyFullname: "",
    name: "",
  };

  const [inputDetails, setInputDetails] = useState(initialDetails);
  const [inputState, setInputState] = useState({});
  const [images, setImages] = useState({
    partyLogo: [],
    imageEmpty: false,
  });
  const [openAlert, setOpenAlert] = useState({
    open: false,
    type: "",
    message: "",
  });

  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    setInputDetails({ ...inputDetails, [name]: value });

    setInputState(false);
  };

  const onFileUpload = (e) => {
    const { files, name } = e.target;
    setImages({ ...images, [name]: [...files] });
  };

  const removeImage = (e) => {
    let temp = images.partyLogo;
    temp.splice(e, 1);
    setImages({ partyLogo: temp });
  };

  const submitData = () => {
    if (validateInputs(inputDetails, setInputState, inputState)) return false;
    if (!images.partyLogo.length)
      return setImages({ ...images, imageEmpty: true });
    const data = {
      partyLogo: images.partyLogo,
      ...inputDetails,
    };
    console.log(data);
    setInputDetails(initialDetails);
    setImages({ ...images, partyLogo: [], imageEmpty: false });
    setOpenAlert({
      open: true,
      type: "success",
      message: "Party added Succesfully!!!",
    });
  };

  return (
    <>
      {openAlert.open && (
        <Alert
          type={openAlert.type}
          message={openAlert.message}
          closeFunction={() => setOpenAlert({ ...openAlert, open: false })}
        />
      )}
      <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
        <div className="col-span-full sm:col-span-6">
          <InputBox
            name="partyFullname"
            value={inputDetails.partyFullname}
            onChange={onChangeInputs}
            title="Enter Party name"
            type="text"
          />
          {inputState.partyFullname && errorMessage("Please enter Party name")}
        </div>

        <div className="col-span-full sm:col-span-6">
          <InputBox
            name="name"
            value={inputDetails.name}
            onChange={onChangeInputs}
            title="Enter Party full name"
            type="text"
          />
          {inputState.name && errorMessage("Please enter Party full name")}
        </div>

        {/* image */}
        <div className="col-span-full sm:col-span-6">
          <label
            htmlFor="zip"
            className=" text-blue-800 font-semibold flex justify-center"
          >
            Party Logo
          </label>
          <div className="flex justify-around">
            <UploadImage
              onFileUpload={onFileUpload}
              name="partyLogo"
              multiple={false}
            />

            {images.partyLogo && (
              <DisplayAddedImages
                imagesArray={images.partyLogo}
                removeImage={removeImage}
              />
            )}
          </div>
          <div className="flex justify-center mt-8">
            {images.imageEmpty && errorMessage("Party logo is needed")}
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-6 sm:mt-4">
        <button
          type="submit"
          className="form-btn px-8 py-2 font-semibold"
          onClick={submitData}
        >
          Update Party
        </button>
      </div>
    </>
  );
};
