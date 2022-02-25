import { HeaderText } from "../../components/HeaderText";
import { Goback } from "../../components/Goback";
import { EditPromises } from "./EditPromises";

const Wards = [
  { _id: 1, name: "Flyover  1" },
  { _id: 2, name: "Flyover 2" },
  { _id: 3, name: "Flyover 3" },
];

const ViewLocation = () => {
  const mapPromises = Wards.map(({ _id, name }, i) => (
    <EditPromises key={i + _id} id={_id} name={name} />
  ));

  return (
    <div>
      <HeaderText text="Product 1" />
      <Goback path={"/Promises"} location={"Promises"} />
      <div className="mt-12">
        <div className="">
          <div className="mx-0 mt-6 md:ml-4 md:mt-0">
            <div className="text-gray-500 font-semibold text-2xl text-center">
              Nyeson Wike
            </div>
            <div className=" mt-4 sm:mt-0">
              <div className=" text-lg font-semibold text-gray-700">
                Promises
              </div>
              <div className="ml-8">
                <ul className=" font-medium text-base text-gray-600">
                  {mapPromises}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLocation;
