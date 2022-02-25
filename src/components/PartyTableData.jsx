import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import { Modal } from "./Modal";
import { EditParty } from "../pages/Parties/EditParty";

export const PartyTableData = ({ _id, name, image, fullName, index }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <tr className="border-b border-gray-200 hover:bg-gray-100">
        <td className="py-3 px-6 text-left whitespace-nowrap">
          <div className="flex items-center">
            <span className="font-medium">{index + 1}</span>
          </div>
        </td>
        <td className="py-3 px-6 text-left">
          <div className="flex items-center font-medium">
            <span>{name}</span>
          </div>
        </td>
        <td className="py-3 px-6 text-left">
          <div className="flex items-center font-medium">
            <span>{fullName}</span>
          </div>
        </td>

        <td className="py-3 px-6 text-center">
          <img src={image} alt="" width={60} className="cursor-pointer" />
        </td>

        <td className="py-3 text-center">
          <div className="flex item-center justify-center">
            <div
              className="w-4 mr-8 transform hover:text-green-500 hover:scale-110 cursor-pointer"
              onClick={() => setOpenModal(true)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </div>

            <div className="w-4 transform hover:text-red-500 hover:scale-110 cursor-pointer">
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        </td>
      </tr>
      {openModal && (
        <Modal setModal={() => setOpenModal(false)}>
          <EditParty _id={_id} name={name} image={image} fullName={fullName} />
        </Modal>
      )}
    </>
  );
};
