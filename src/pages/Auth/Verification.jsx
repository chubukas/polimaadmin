import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { backendApi } from "../../utils";
import { selectIsAuthenticated } from "../../features/slices/authSlice";

const VerificationPage = () => {
  const [changeState, setChangeState] = useState({ message: "", status: null });
  const [redirectTo, setRedirectTo] = useState(false);

  const { activationToken } = useParams();

  const isAuthenticated = useSelector(selectIsAuthenticated);

  // useEffect(() => {

  // }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      setRedirectTo(true);
    } else {
      (async () => {
        const response = await fetch(
          `${backendApi()}/admin/confirmMail/${activationToken}`
        );
        const data = await response.json();

        if (data.status === "fail")
          return setChangeState({ message: data.message, status: false });

        if (data.status === "Success")
          return setChangeState({ message: data.message, status: true });

        console.log(data);
      })();
    }
  }, [activationToken, isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center bg-white">
      {redirectTo && <Redirect to="/Dashboard" />}
      <div className="container mx-auto p-4 flex flex-wrap items-center">
        <div className="w-full md:w-5/12 text-center p-4">
          {changeState.status === true && (
            <img src="/images/success.png" alt="success icon" />
          )}

          {changeState.status === false && (
            <img src="/images/error.png" alt="error icon" />
          )}
        </div>
        <div className="w-full md:w-7/12 text-center md:text-left p-4">
          {changeState.status === true && (
            <div className="sucessgreen">
              <div className="text-6xl font-medium">Successfull</div>
              <div className="text-xl md:text-3xl font-medium mb-4">
                {changeState.message}
              </div>
              <div className="text-lg mb-8">
                You can login now by clicking on the button below
              </div>
              <Link
                to="/"
                className="border border-green-600 rounded py-2 px-6"
              >
                Login
              </Link>
            </div>
          )}
          {changeState.status === false && (
            <div className="errorRed">
              <div className="text-6xl font-medium">Error</div>
              <div className="text-xl md:text-3xl font-medium mb-4">
                <p>{changeState.message}</p>
              </div>
              <div className="text-lg mb-8">
                <p>
                  It's either you have activated your account before or you
                  havn't registered yet
                </p>
                <p className="text-sm mt-5">
                  If you haven't registered please tell admin to register you
                </p>
                <p>Or you can login below</p>
              </div>

              <Link to="/" className="border border-red-600 rounded py-2 px-6">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
