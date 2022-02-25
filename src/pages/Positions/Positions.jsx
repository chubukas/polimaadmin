import { useState, useEffect } from "react";
// import axios from "axios";

import { HeaderText } from "../../components/HeaderText";
// import { backendApi } from "../utils";
import { NoData } from "../../components/NoData";
import { Preloader } from "../../components/loader/Preloader";
import { AddButton } from "../../components/AddButton";
import { Modal } from "../../components/Modal";
import { PositionTableData } from "../../components/PositionTableData";
import { AddPosition } from "./AddPosition";

const Positions = () => {
  const [allPosition, setAllPosition] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Get all Customers
  useEffect(() => {
    setAllPosition([
      { _id: 1, name: "Senator" },
      { _id: 2, name: "Governor" },
      { _id: 3, name: "Chairman" },
    ]);
  }, []);

  return (
    <div>
      <HeaderText text="Positions" />
      <AddButton name=" Add Position" onClick={() => setOpenModal(true)} />
      <div className="mt-8">
        <div className="overflow-x-auto">
          <div className="min-w-screen flex items-center justify-center font-sans">
            {!allPosition ? (
              <Preloader />
            ) : (
              <div className="w-full">
                {allPosition?.length > 0 ? (
                  <table className="min-w-max w-full table-auto shadow-md rounded bg-white">
                    <thead>
                      <tr className="bg-indigo-100 text-indigo-700 uppercase text-xs leading-normal shadow-md rounded">
                        <th className="py-3 px-6 text-left">S/N</th>
                        <th className="py-3 px-6 text-left">Position</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-xs font-light">
                      {allPosition?.map(({ _id, name }, i) => (
                        <PositionTableData
                          key={_id + i}
                          name={name}
                          id={_id}
                          index={i}
                        />
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <NoData message="No Position Yet" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {openModal && (
        <Modal setModal={() => setOpenModal(false)}>{<AddPosition />}</Modal>
      )}
    </div>
  );
};

export default Positions;
