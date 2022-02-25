import {
  faTrashAlt,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const DialogModal = ({
  type,
  subQuestion,
  buttonName,
  mainAction,
  cancelAction,
  open,
}) => {
  const color =
    type === "error"
      ? "text-red-500"
      : type === "warning"
      ? "text-yellow-500"
      : "text-green-500";

  const bgcolor =
    type === "error"
      ? "bg-red-500 border-red-500 hover:bg-red-600"
      : type === "warning"
      ? "bg-yellow-500 border-yellow-500 hover:bg-yellow-600"
      : "bg-green-500 border-green-500 hover:bg-green-600";

  return (
    <>
      {open && (
        <div
          className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none"
          id="modal-id"
        >
          <div className="absolute bg-black opacity-70 inset-0 z-0"></div>
          <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
            {/* <!--content--> */}
            <div className="">
              {/* <!--body--> */}
              <div className="text-center p-5 flex-auto justify-center">
                {type !== "error" && (
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className={`fa-3x flex items-center ${color} mx-auto mt-3`}
                  />
                )}
                {type === "error" && (
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className={`fa-3x flex items-center ${color} mx-auto mt-3`}
                  />
                )}
                <h3 className={`text-xl font-bold py-4 ${color}`}>
                  Are you sure?
                </h3>
                <p className="text-sm text-gray-500 px-8">{subQuestion}</p>
              </div>
              {/* <!--footer--> */}
              <div className="p-3  mt-2 text-center space-x-4 md:block">
                <button
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                  onClick={cancelAction}
                >
                  Cancel
                </button>
                {buttonName && (
                  <button
                    className={`mb-2 md:mb-0 ${bgcolor} px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg `}
                    onClick={mainAction}
                  >
                    {buttonName}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
