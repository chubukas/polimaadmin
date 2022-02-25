import { useState } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { TableDataForm } from "../../components/TableDataForm";

export const EditPromises = ({ id, name }) => {
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState(name);

  const UpdateState = () => {
    if (input === "") return alert("Please enter Ward");

    console.log(id, name);
    setShowInput(false);
  };

  return (
    <>
      {!showInput ? (
        <li>
          {input}
          <span
            className="ml-2 text-xs text-blue-600 cursor-pointer"
            onClick={() => setShowInput(true)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </span>
        </li>
      ) : (
        <>
          <TableDataForm
            type="text"
            name="state"
            value={input}
            onChange={setInput}
            onClick={UpdateState}
            textArea={true}
          />
          <span
            className="text-blue-800 bg-blue-200 text-xs p-1 ml-2 cursor-pointer rounded"
            onClick={() => setShowInput(false)}
          >
            Close
          </span>
        </>
      )}
    </>
  );
};
