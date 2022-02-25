import { useState } from "react";

import { InputBox } from "../../components/InputBox";
import { SelectBox } from "../../components/SelectBox";
import { errorMessage, validateInputs } from "../../utils";
import { Alert } from "../../components/Alert";

const initialDetails = {
  stateName: "",
  LGAs: "",
};

export const AddLGAs = () => {
  const [inputDetails, setInputDetails] = useState(initialDetails);
  const [inputState, setInputState] = useState({});
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

  const submitData = () => {
    if (validateInputs(inputDetails, setInputState, inputState)) return false;
    setInputDetails(initialDetails);
    setOpenAlert({
      open: true,
      type: "success",
      message: "Save Succesfully!!!",
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
      <div className="flex justify-center mt-12 mb-6 text-blue-800 font-bold font-sans text-base">
        <p>Add LGA</p>
      </div>

      <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
        <div className="col-span-full sm:col-span-3">
          <SelectBox
            name="stateName"
            value={inputDetails.stateName}
            onChange={onChangeInputs}
            title="Select State Name"
            optionArray={["Category 1", "Category 2", "Category 3"]}
          />
          {inputState.stateName && errorMessage("Please Select State")}
        </div>

        <div className="col-span-full sm:col-span-3">
          <InputBox
            name="LGAs"
            value={inputDetails.LGAs}
            onChange={onChangeInputs}
            title="Enter Local Govement area"
            type="text"
          />
          {inputState.LGAs && errorMessage("Please enter Local Government")}
        </div>
      </div>
      <div className="flex justify-center mb-6 mt-8">
        <button
          type="submit"
          className="form-btn px-8 py-2 font-semibold"
          onClick={submitData}
        >
          Save LGA
        </button>
      </div>
    </>
  );
};
