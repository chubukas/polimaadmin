import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const UsersTableData = ({
  fullName,
  phoneNumber,
  email,
  customerId,
  link,
  deleteUser,
}) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div className="flex items-center">
          <Link to={link}>
            <span className="font-medium">{fullName}</span>
          </Link>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <div className="flex items-center font-medium">
          <span>{phoneNumber}</span>
        </div>
      </td>

      <td className="py-3 px-6 text-center">
        <div className="flex items-center font-medium">
          <span>{email}</span>
        </div>
      </td>

      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-center ">
          <Link to={link}>
            <div className="w-4 mr-8 transform hover:text-green-500 hover:scale-110">
              <FontAwesomeIcon icon={faEye} />
            </div>
          </Link>

          <div className="w-4 transform hover:text-red-500 hover:scale-110">
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => deleteUser(customerId)}
            />
          </div>
        </div>
      </td>
    </tr>
  );
};
