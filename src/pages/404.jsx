import { Link } from "react-router-dom";

export const Page404 = () => {
  return (
    <section className="flex items-center h-full bg-white text-gray-700 w-11/12 mx-auto my-10 shadow-md rounded-md">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-blue-800">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 text-coolGray-600">
            But dont worry, lets take you back to your dashboard.
          </p>
          <Link
            to="/Dashboard"
            className="px-8 py-3 font-semibold rounded bg-blue-800 text-white"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </section>
  );
};
