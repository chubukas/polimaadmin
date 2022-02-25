import { Link } from "react-router-dom";

export const FormLayout = ({ children }) => {
  return (
    <div className="my-6 sm:my-10">
      <div className="flex justify-center">
        <Link to="#" className="">
          <div className="items-center shadow-md">
            <img
              className="block sm:hidden h-8 w-48 rounded-md"
              src="/images/logo.jpg"
              alt="logo"
            />
            <img
              className="hidden sm:block h-9 w-48 rounded"
              src="/images/logo.jpg"
              alt="logo"
            />
          </div>
        </Link>
      </div>
      <div className="flex justify-center ">{children}</div>
    </div>
  );
};
