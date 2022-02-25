import { useState } from "react";

import { InputBox } from "../../components/InputBox";
import { errorMessage } from "../../utils";
import { Alert } from "../../components/Alert";

export const AddPosition = () => {
  const [input, setInput] = useState("");
  const [inputerror, setInputError] = useState(false);
  const [openAlert, setOpenAlert] = useState({
    open: false,
    type: "",
    message: "",
  });

  const onChange = (e) => {
    setInput(e.target.value);
    setInputError(false);
  };

  const submitData = () => {
    if (input === "") return setInputError(true);
    setInput("");
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
      <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
        <div className="col-span-full sm:col-span-6">
          <InputBox
            name="PositionName"
            value={input}
            onChange={onChange}
            title="Enter Position"
            type="text"
          />
          {inputerror && errorMessage("Position Name is needed")}
        </div>

        <div className="col-span-full sm:col-span-3 sm:mt-4">
          <button
            type="submit"
            className="form-btn px-8 py-2 font-semibold"
            onClick={submitData}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};
