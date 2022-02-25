import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import { TableDataForm } from "./TableDataForm";

export const PositionTableData = ({ name, id, deleteFees, index }) => {
  const [value, setValue] = useState(name);
  const [showInput, setShowInput] = useState(false);

  const UpdateShippingFee = async () => {
    console.log(id, value);
    setShowInput(false);
  };

  return (
    <>
      <tr className="border-b border-gray-200 hover:bg-gray-100">
        <td className="py-3 px-6 text-left whitespace-nowrap">
          <div className="flex items-center">
            <span className="font-medium">{index + 1}</span>
          </div>
        </td>
        <td className="py-3 px-6 text-left whitespace-nowrap">
          <div className="flex items-center">
            {!showInput ? (
              <span className="font-medium">{value}</span>
            ) : (
              <TableDataForm
                type="text"
                name={name}
                value={value}
                onChange={setValue}
                onClick={UpdateShippingFee}
              />
            )}
          </div>
        </td>
        <td className="py-3 px-6 text-center">
          <div className="flex item-center justify-center ">
            <div
              className="w-4 mr-8 transform hover:text-green-500 hover:scale-110 cursor-pointer"
              onClick={() => setShowInput(!showInput)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </div>

            <div className="w-4 transform hover:text-red-500 hover:scale-110 cursor-pointer">
              <FontAwesomeIcon icon={faTrash} onClick={() => deleteFees(id)} />
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};
