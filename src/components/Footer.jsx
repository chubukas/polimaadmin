import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="px-4 py-8 main-bg text-white mt-48">
      <div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
        <div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
          <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-violet-600">
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
          <ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
            <li>
              <Link to="#">Terms of Use</Link>
            </li>
            <li>
              <Link to="#">Privacy</Link>
            </li>
          </ul>
        </div>
        <ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
          <li>
            <a href="/">Instagram</a>
          </li>
          <li>
            <a href="/">Facebook</a>
          </li>
          <li>
            <a href="/">Twitter</a>
          </li>
        </ul>
        <div className="py-6 text-xs text-center text-gray-300">
          {` © ${new Date().getFullYear()} Raxon Company Co. All rights reserved.`}
        </div>
      </div>
    </footer>
  );
};
