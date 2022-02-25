import { HeaderText } from "../../components/HeaderText";
import { Goback } from "../../components/Goback";
import { EditState } from "./EditState";
import { EditLocalGoverment } from "./EditLocalGovernment";
import { EditWards } from "./EditWards";

const LGAs = [
  { _id: 1, name: "PHLGA" },
  { _id: 2, name: "Igirita LGA" },
  { _id: 3, name: "Eche LGA" },
];

const Wards = [
  { _id: 1, name: "Ward 1" },
  { _id: 2, name: "Ward 2" },
  { _id: 3, name: "Ward 3" },
];

const ViewLocation = () => {
  const mapLGAs = LGAs.map(({ _id, name }, i) => (
    <EditLocalGoverment key={i + _id} id={_id} name={name} />
  ));

  const mapWards = Wards.map(({ _id, name }, i) => (
    <EditWards key={i + _id} id={_id} name={name} />
  ));

  return (
    <div>
      <HeaderText text="Product 1" />
      <Goback path={"/Locations"} location={"Locations"} />
      <div className="mt-12">
        <div className="">
          <div className="mx-0 mt-6 md:ml-4 md:mt-0">
            <EditState id="1" name="River State" />
            <div className=" grid text-center sm:grid-cols-2 mt-14">
              <div>
                <div className=" text-lg font-semibold text-gray-700">
                  Local Government Areas
                </div>
                <div className="ml-8">
                  <ul className=" font-medium text-base text-gray-600">
                    {mapLGAs}
                  </ul>
                </div>
              </div>

              <div className=" mt-4 sm:mt-0">
                <div className=" text-lg font-semibold text-gray-700">
                  Wards
                </div>
                <div className="ml-8">
                  <ul className=" font-medium text-base text-gray-600">
                    {mapWards}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLocation;
