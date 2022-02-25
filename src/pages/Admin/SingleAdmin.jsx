import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { HeaderText } from "../../components/HeaderText";
import { backendApi, formatDate } from "../../utils";
import { Preloader } from "../../components/loader/Preloader";

const SingleAdmin = () => {
  const [allAdmin, setAllAdmin] = useState(null);
  const [createdBy, setCreatedBy] = useState("");

  const { id } = useParams();

  // method to get single admin
  const getUser = useCallback(async (userid) => {
    let response;
    try {
      const data = await axios.get(`${backendApi()}/admin/${userid}`);
      response = data.data;
    } catch (error) {
      response = error.response.data;
    }

    return response;
  }, []);

  // call single admin
  useEffect(() => {
    getUser(id)
      .then((response) => {
        if (response.statusCode === 200) {
          setAllAdmin(response.data);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      setAllAdmin(null);
    };
  }, [getUser, id]);

  // get created by
  useEffect(() => {
    if (allAdmin?.createdBy) {
      getUser(allAdmin?.createdBy)
        .then((response) => {
          if (response?.statusCode === 200) {
            setCreatedBy(
              `${response?.data?.firstName} ${response?.data?.lastName}`
            );
          }
        })
        .catch((err) => console.log(err));
    }

    return () => {
      setCreatedBy("");
    };
  }, [allAdmin?.createdBy, getUser]);

  return (
    <div>
      {allAdmin ? (
        <Preloader />
      ) : (
        <>
          <HeaderText text="Admin Profile" />
          <div className="container mx-auto my-5 p-5">
            <div className="md:flex no-wrap md:-mx-2 ">
              {/* <!-- Left Side --> */}
              <div className="w-full md:w-3/12 md:mx-2">
                {/* <!-- Profile Card --> */}
                <div className="bg-white p-3 border-t-4 border-blue-800">
                  <div className="image overflow-hidden">
                    <img
                      className="h-auto w-full mx-auto"
                      src={`${
                        allAdmin?.avatar
                          ? JSON.parse(allAdmin.avatar)[0].fileName
                          : "/images/imageholder.png"
                      } `}
                      alt=""
                    />
                  </div>
                  <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                    {`${allAdmin?.firstName} ${allAdmin?.lastName} `}
                  </h1>

                  <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 rounded shadow-sm">
                    <li className="flex items-center">
                      <span className="text-xs font-semibold">
                        Member since
                      </span>
                      <span className="ml-auto text-xs">
                        {allAdmin?.createdAt &&
                          formatDate(allAdmin?.createdAt, true)}
                      </span>
                    </li>
                  </ul>
                </div>
                {/* <!-- End of profile card --> */}
                <div className="my-4"></div>
              </div>
              {/* <!-- Right Side --> */}
              <div className="w-full md:w-9/12 mx-2">
                {/* <!-- About Section -->  */}

                <div className="flex items-center space-x-2 font-semibold text-blue-800 leading-8">
                  <span>
                    <FontAwesomeIcon icon={faUserAlt} />
                  </span>

                  <span className="tracking-wide">About</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm divide-y md:divide-y-0">
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">First Name</div>
                      <div className="py-2">{allAdmin?.firstName}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">Last Name</div>
                      <div className="py-2">{allAdmin?.lastName}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">Gender</div>
                      <div className="py-2">{allAdmin?.gender}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">Contact No.</div>
                      <div className="py-2">
                        <a
                          href={`tel:+${allAdmin?.phoneNo}`}
                          className="text-blue-800"
                        >
                          {allAdmin?.phoneNo}
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">Birthday</div>
                      <div className="py-2">
                        {allAdmin?.birthday && formatDate(allAdmin?.birthday)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">Email</div>
                      <div className="py-2">
                        <a
                          className="text-blue-800"
                          href={`mailto:${allAdmin?.email}`}
                        >
                          {allAdmin?.email}
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">Address</div>
                      <div className="py-2">{allAdmin?.Address}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">City</div>
                      <div className="py-2">{allAdmin?.city}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">State</div>
                      <div className="py-2">{allAdmin?.state}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">Added By</div>
                      <div className="py-2">{createdBy}</div>
                    </div>
                  </div>
                </div>

                {/* <!-- End of about section --> */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleAdmin;
