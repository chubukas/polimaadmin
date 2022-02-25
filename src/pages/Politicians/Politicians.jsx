import { useState, useEffect } from "react";
// import axios from "axios";
import { useDispatch } from "react-redux";

import { HeaderText } from "../../components/HeaderText";
import { AddButton } from "../../components/AddButton";

import { NoData } from "../../components/NoData";
import { clearResponse } from "../../features/slices/authSlice";
import { DialogModal } from "../../components/DialogModal";
import { Preloader } from "../../components/loader/Preloader";
import { PoliticianTableData } from "../../components/PoliticianTableData";

const politician = [
  {
    _id: 1,
    fullName: "Nyesom Wike",
    position: "Govenor",
    party: "PDP",
    state: "Rivers State",
  },
];

const Politicians = () => {
  const [allAdmin, setAllAdmin] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const dispatch = useDispatch();

  // Get all admin
  useEffect(() => {
    setAllAdmin(politician);
  }, []);

  // Clean response on unmout
  useEffect(() => {
    return () => {
      dispatch(clearResponse());
    };
  }, [dispatch]);

  // Delete user function
  const deleteUser = async () => {
    console.log(deleteId);
  };

  // Function for dialog
  const openDialogAndSetId = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  return (
    <div>
      <HeaderText text="All Politicians" />

      {!allAdmin ? (
        <Preloader />
      ) : (
        <>
          <AddButton name=" Add Politician" link="/Politicians/AddPolitician" />

          <div className="mt-8">
            <div className="overflow-x-auto">
              <div className="min-w-screen flex items-center justify-center font-sans">
                <div className="w-full">
                  {allAdmin?.length ? (
                    <table className="min-w-max w-full table-auto shadow-md rounded bg-white">
                      <thead>
                        <tr className="bg-indigo-100 text-indigo-700 uppercase text-xs leading-normal shadow-md rounded">
                          <th className="py-3 px-6 text-left">S/N</th>
                          <th className="py-3 px-6 text-left">Full Name</th>
                          <th className="py-3 px-6 text-left">Position</th>
                          <th className="py-3 px-6 text-center">State</th>
                          <th className="py-3 px-6 text-center">Party</th>
                          <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600 text-xs font-light">
                        {allAdmin.map(
                          ({ fullName, position, party, state, _id }, i) => (
                            <PoliticianTableData
                              key={i + _id}
                              fullName={fullName}
                              postion={position}
                              party={party}
                              state={state}
                              id={_id}
                              link={`/Politicians/singlePolitician/${_id}`}
                              deleteUser={openDialogAndSetId}
                              index={i}
                            />
                          )
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <NoData message="No Admin Yet" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <DialogModal
            type="error"
            subQuestion={`Do you really want to delete this account ?
                      This process cannot be undone`}
            buttonName="Delete"
            open={openDialog}
            cancelAction={() => setOpenDialog(false)}
            mainAction={deleteUser}
          />
        </>
      )}
    </div>
  );
};

export default Politicians;
