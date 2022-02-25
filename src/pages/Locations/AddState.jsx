import { useState } from "react";

import { InputBox } from "../../components/InputBox";
import { errorMessage } from "../../utils";
import { Alert } from "../../components/Alert";

export const AddStateName = () => {
  const [inputState, setInputState] = useState("");
  const [inputerror, setInputError] = useState(false);
  const [openAlert, setOpenAlert] = useState({
    open: false,
    type: "",
    message: "",
  });

  const onChange = (e) => {
    setInputState(e.target.value);
    setInputError(false);
  };

  const submitData = () => {
    if (inputState === "") return setInputError(true);
    setInputState("");
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
      <div className="flex justify-center mt-8 mb-4 text-blue-800 font-bold font-sans text-base">
        <p>Add State</p>
      </div>
      <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
        <div className="col-span-full sm:col-span-3">
          <InputBox
            name="StateName"
            value={inputState}
            onChange={onChange}
            title="Enter State Name"
            type="text"
          />
          {inputerror && errorMessage("State Name is needed")}
        </div>

        <div className="col-span-full sm:col-span-3 sm:mt-4">
          <button
            type="submit"
            className="form-btn px-8 py-2 font-semibold"
            onClick={submitData}
          >
            Save State
          </button>
        </div>
      </div>
    </>
  );
};
