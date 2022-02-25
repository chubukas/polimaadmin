import { useState } from "react";

import { PartyTableData } from "../../components/PartyTableData";
import { HeaderText } from "../../components/HeaderText";
import { AddButton } from "../../components/AddButton";
import { Modal } from "../../components/Modal";
import { AddParty } from "./AddParty";

const parties = [
  {
    _id: 1,
    name: "PDP",
    image: "/images/1.jpg",
    fullName: "Peoples Democratic Party",
  },
  {
    _id: 2,
    name: "APC",
    image: "/images/2.jpeg",
    fullName: "All Peoples Congress",
  },
  {
    _id: 3,
    name: "ACP",
    image: "/images/3.jpeg",
    fullName: "Action Congress Party",
  },
];

const Parties = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <HeaderText text="All Parties" />
      <AddButton name=" Add Party" onClick={() => setOpenModal(true)} />
      <div className="mt-8">
        <div className="overflow-x-auto">
          <div className="min-w-screen flex items-center justify-center font-sans">
            <div className="w-full">
              <table className="min-w-max w-full table-auto shadow-md rounded bg-white">
                <thead>
                  <tr className="bg-indigo-100 text-indigo-700 uppercase text-xs leading-normal shadow-md rounded">
                    <th className="py-3 px-6 text-left">S/N</th>
                    <th className="py-3 px-6 text-left">Party</th>
                    <th className="py-3 px-6 text-left">Party Full Name</th>
                    <th className="py-3 px-6 text-left">Party Image</th>
                    <th className="py-3 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-xs font-light">
                  {parties.map(({ _id, name, image, fullName }, i) => (
                    <PartyTableData
                      key={i + _id}
                      id={_id}
                      name={name}
                      image={image}
                      fullName={fullName}
                      index={i}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <Modal setModal={() => setOpenModal(false)}>
          <AddParty />
        </Modal>
      )}
    </div>
  );
};

export default Parties;
