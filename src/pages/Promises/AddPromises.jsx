import { useState } from "react";

import { SelectBox } from "../../components/SelectBox";
import { errorMessage, validateInputs } from "../../utils";
import { Alert } from "../../components/Alert";
import { TextArea } from "../../components/TextArea";
import { Goback } from "../../components/Goback";

const initialDetails = {
  politician: "",
  promise: "",
};

const AddPromises = () => {
  const [inputDetails, setInputDetails] = useState(initialDetails);
  const [position, setPosition] = useState("");
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
        <p>Add Promise</p>
      </div>
      <Goback path={"/Promises"} location={"Promises"} />

      <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3 mt-10">
        <div className="col-span-full sm:col-span-3">
          <SelectBox
            name="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            title="Select Position"
            optionArray={["Governor", "Chairman", "Senator"]}
          />
        </div>

        {position && (
          <div className="col-span-full sm:col-span-3">
            <SelectBox
              name="politician"
              value={inputDetails.politician}
              onChange={onChangeInputs}
              title={`Select ${position}`}
              optionArray={["Nyeson Wike", "Soludo", "Obi"]}
            />
            {inputState.politician && errorMessage(`Please Select ${position}`)}
          </div>
        )}

        <div className="col-span-full sm:col-span-6">
          <TextArea
            name="promise"
            value={inputDetails.promise}
            onChange={onChangeInputs}
            title="write the promise"
          />
          {inputState.Promise && errorMessage("Promise is needed")}
        </div>

        <div className="flex justify-center mb-6 sm:mt-4">
          <button
            type="submit"
            className="form-btn px-8 py-2 font-semibold"
            onClick={submitData}
          >
            Save Promise
          </button>
        </div>
      </div>
    </>
  );
};

export default AddPromises;
