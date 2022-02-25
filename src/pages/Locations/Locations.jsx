import { AddButton } from "../../components/AddButton";
import { ProductTableData } from "../../components/LocationTableData";
import { HeaderText } from "../../components/HeaderText";

const Locations = () => {
  return (
    <div>
      <HeaderText text="Locations" />
      <AddButton link="/Locations/AddLocations" name=" Add Locations" />
      <div className="mt-8">
        <div className="overflow-x-auto">
          <div className="min-w-screen flex items-center justify-center font-sans">
            <div className="w-full">
              <table className="min-w-max w-full table-auto shadow-md rounded bg-white">
                <thead>
                  <tr className="bg-indigo-100 text-indigo-700 uppercase text-xs leading-normal shadow-md rounded">
                    <th className="py-3 px-6 text-left">S/N</th>
                    <th className="py-3 px-6 text-left">State</th>
                    <th className="py-3 px-6 text-center">Local Governments</th>
                    <th className="py-3 px-6 text-center">No of LGA</th>
                    <th className="py-3 px-6 text-center">Wards</th>
                    <th className="py-3 px-6 text-center">No of Wards</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-xs font-light">
                  <ProductTableData
                    States="Rivers State"
                    LGAs={["PH LGA", "Eche LGA", "Igirita LGA"]}
                    NOLGAs={3}
                    Wards={["Ward 1", "Ward 2", "Ward 3"]}
                    NoWards={3}
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
