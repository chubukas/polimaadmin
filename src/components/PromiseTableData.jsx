import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const PromiseTableData = ({ fullName, position, promises, party }) => {
  const allpromises = promises.map((data, i) => {
    return i <= 1 ? <p key={data + i}>{data}</p> : ".............";
  });

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap">1</td>
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div className="flex items-center">
          <span className="font-medium">{fullName}</span>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex items-center justify-center font-semibold">
          <p> {position}</p>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <div className=" text-center font-medium">{party}</div>
      </td>
      <td className="py-3 px-6 text-left">
        <div className=" text-center font-medium">{allpromises}</div>
      </td>

      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-center ">
          <Link to={`/Promises/ViewPromises/34234334`}>
            <div className="w-4 mr-8 transform hover:text-green-500 hover:scale-110 cursor-pointer">
              <FontAwesomeIcon icon={faEye} />
            </div>
          </Link>

          <div className="w-4 transform hover:text-red-500 hover:scale-110 cursor-pointer">
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
      </td>
    </tr>
  );
};
