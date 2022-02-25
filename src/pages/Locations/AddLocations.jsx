import { HeaderText } from "../../components/HeaderText";
import { Goback } from "../../components/Goback";

import { AddStateName } from "./AddState";
import { AddLGAs } from "./AddLGAs";
import { AddWard } from "./AddWard";

const AddLocations = () => {
  return (
    <div>
      <HeaderText text="Add Location" />
      <Goback path={"/Locations"} location={"Locations"} />

      <div className="py-4 rounded-xl bg-white font-sans">
        <AddStateName />
        <div className="mt-20">
          <hr />
        </div>
        <AddLGAs />
        <div className="mt-20">
          <hr />
        </div>
        <AddWard />
      </div>
    </div>
  );
};

export default AddLocations;
