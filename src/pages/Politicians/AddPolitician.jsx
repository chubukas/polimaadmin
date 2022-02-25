import { useState } from "react";

import { Alert } from "../../components/Alert";
import { errorMessage, validateInputs } from "../../utils";
import { HeaderText } from "../../components/HeaderText";
import { InputBox } from "../../components/InputBox";
import { SelectBox } from "../../components/SelectBox";
import { DisplayAddedImages } from "../../components/DisplayAddedImages";
import { UploadImage } from "../../components/UploadImage";
import { TextArea } from "../../components/TextArea";
import { Goback } from "../../components/Goback";

const initialDetails = {
  firstName: "",
  lastName: "",
  StateName: "",
  LGAs: "",
  ward: "",
  birthday: "",
  phone: "",
  gender: "",
  email: "",
  party: "",
  about: "",
};

const AddLocations = () => {
  const [inputDetails, setInputDetails] = useState(initialDetails);
  const [inputState, setInputState] = useState({});
  const [openAlert, setOpenAlert] = useState(false);

  const [images, setImages] = useState({
    productImages: [],
    imageEmpty: false,
    imageError: false,
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
    let temp = images.productImages;
    temp.splice(e, 1);
    setImages({ productImages: temp });
  };

  const submitData = (e) => {
    e.preventDefault();
    if (validateInputs(inputDetails, setInputState, inputState)) return false;
    if (!images.productImages.length)
      return setImages({ ...images, imageEmpty: true });
    if (images.productImages.length > 3)
      return setImages({ ...images, imageError: true });

    const data = {
      ...inputDetails,
      productImages: images.productImages,
    };

    console.log(data);
    setOpenAlert(true);
    setInputDetails(initialDetails);
    setImages({ productImages: [], imageEmpty: false, imageError: false });
  };

  return (
    <div>
      <HeaderText text="Add Politician" />
      <Goback path={"/Politicians"} location={"Politicians"} />
      {openAlert && (
        <Alert
          type="success"
          message="Politician created successfully."
          closeFunction={() => setOpenAlert(false)}
        />
      )}
      <div className="py-4 rounded-xl bg-white font-sans">
        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          <div className="col-span-full sm:col-span-3">
            <InputBox
              name="firstName"
              value={inputDetails.firstName}
              onChange={onChangeInputs}
              title="First Name"
              type="text"
            />
            {inputState.firstName && errorMessage("First Name is needed")}
          </div>
          <div className="col-span-full sm:col-span-3">
            <InputBox
              name="lastName"
              value={inputDetails.lastName}
              onChange={onChangeInputs}
              title="Last Name"
              type="text"
            />
            {inputState.lastName && errorMessage("Last Name is needed")}
          </div>

          <div className="col-span-full sm:col-span-3">
            <SelectBox
              name="StateName"
              value={inputDetails.StateName}
              onChange={onChangeInputs}
              title="Select State"
              optionArray={["Rivers State", "Lagos State", "Anambra State"]}
            />
            {inputState.StateName && errorMessage("State is needed")}
          </div>
          <div className="col-span-full sm:col-span-3">
            <SelectBox
              name="LGAs"
              value={inputDetails.LGAs}
              onChange={onChangeInputs}
              title="Select Local Governement"
              optionArray={["PHLGA", "Orumba South"]}
            />
            {inputState.LGAs && errorMessage("Local Governement is needed")}
          </div>
          <div className="col-span-full sm:col-span-3">
            <SelectBox
              name="ward"
              value={inputDetails.ward}
              onChange={onChangeInputs}
              title="Select Ward"
              optionArray={["Ward 1", "Ward 2"]}
            />
            {inputState.ward && errorMessage("Ward is needed")}
          </div>
          <div className="col-span-full sm:col-span-3">
            <InputBox
              name="birthday"
              value={inputDetails.birthday}
              onChange={onChangeInputs}
              title="Birthday"
              type="date"
            />
            {inputState.birthday && errorMessage("birthday is needed")}
          </div>
          <div className="col-span-full sm:col-span-3">
            <InputBox
              name="phone"
              value={inputDetails.phone}
              onChange={onChangeInputs}
              title="Phone Number"
              type="phone"
            />
            {inputState.phone && errorMessage("phone is needed")}
          </div>
          <div className="col-span-full sm:col-span-3">
            <SelectBox
              name="gender"
              value={inputDetails.gender}
              onChange={onChangeInputs}
              title="Select Gender"
              optionArray={["Male", "Female"]}
            />
            {inputState.gender && errorMessage("Gender is needed")}
          </div>
          <div className="col-span-full sm:col-span-3">
            <InputBox
              name="email"
              value={inputDetails.email}
              onChange={onChangeInputs}
              title="Email"
              type="email"
            />
            {inputState.email && errorMessage("email is needed")}
          </div>
          <div className="col-span-full sm:col-span-3">
            <SelectBox
              name="party"
              value={inputDetails.party}
              onChange={onChangeInputs}
              title="Select Party"
              optionArray={["PDP", "APC"]}
            />
            {inputState.party && errorMessage("Party is needed")}
          </div>

          <div className="col-span-full sm:col-span-6">
            <TextArea
              name="about"
              value={inputDetails.about}
              onChange={onChangeInputs}
              title="About the politician"
            />
            {inputState.about && errorMessage("about is needed")}
          </div>
          <div className="col-span-full sm:col-span-6">
            <label
              htmlFor="zip"
              className=" text-blue-800 font-semibold flex justify-center"
            >
              Image
            </label>
            <div className="grid grid-row-1 sm:grid-cols-3 lg:grid-cols-4 gap-y-8">
              <UploadImage
                onFileUpload={onFileUpload}
                name="productImages"
                multiple={false}
              />

              {images.productImages && (
                <DisplayAddedImages
                  imagesArray={images.productImages}
                  removeImage={removeImage}
                />
              )}
            </div>
            <div className="flex justify-center mt-8">
              {images.imageEmpty && errorMessage("Image is needed")}
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-6 mt-16">
          <button
            type="submit"
            className="form-btn px-8 py-3 font-semibold"
            onClick={submitData}
          >
            Add Politician
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLocations;
