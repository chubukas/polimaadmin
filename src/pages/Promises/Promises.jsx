import { AddButton } from "../../components/AddButton";
import { HeaderText } from "../../components/HeaderText";
import { PromiseTableData } from "../../components/PromiseTableData";

const Locations = () => {
  return (
    <div>
      <HeaderText text="Promises" />
      <AddButton link="/Promises/AddPromises" name=" Add Promises" />
      <div className="mt-8">
        <div className="overflow-x-auto">
          <div className="min-w-screen flex items-center justify-center font-sans">
            <div className="w-full">
              <table className="min-w-max w-full table-auto shadow-md rounded bg-white">
                <thead>
                  <tr className="bg-indigo-100 text-indigo-700 uppercase text-xs leading-normal shadow-md rounded">
                    <th className="py-3 px-6 text-left">S/N</th>
                    <th className="py-3 px-6 text-left">Full Name</th>
                    <th className="py-3 px-6 text-center">Position</th>
                    <th className="py-3 px-6 text-center">Party</th>
                    <th className="py-3 px-6 text-center">Promises</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-xs font-light">
                  <PromiseTableData
                    fullName="Nyeson Wike"
                    position="Governor"
                    promises={[
                      "flyover 1",
                      "flyover 2",
                      "flyover 3",
                      "flyover 4",
                    ]}
                    party="PDP"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
