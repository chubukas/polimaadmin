import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// import { formatNumber } from "../utils";
import { HeaderText } from "../../components/HeaderText";
import { formatDate } from "../../utils";
import { Preloader } from "../../components/loader/Preloader";

const SinglePolitician = () => {
  const [customerData, setCustomerData] = useState(null);

  // const { Id } = useParams();

  useEffect(() => {
    setCustomerData({
      _id: 1,
      lastName: " Wike",
      position: "Govenor",
      party: "PDP",
      state: "Rivers State",
      enteredDate: "12/5/2014",
      firstName: "Nyesom",
      gender: "male",
      phoneNo: "08056412456",
      birthday: "12/3/1965",
      email: "wike@gmail.com",
      LGAs: "PHLGA",
      ward: "ward1",
      promises: [
        { name: "flyover1", date: "12/8/2014" },
        { name: "flyover2", date: "17/10/2014" },
      ],
      about: "he is a good man",
    });
    return () => {
      setCustomerData({});
    };
  }, []);

  return (
    <div>
      {!customerData ? (
        <Preloader />
      ) : (
        <>
          <HeaderText text="Customer Profile" />
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
                        customerData?.avatar
                          ? JSON.parse(customerData.avatar)[0].fileName
                          : "/images/imageholder.png"
                      } `}
                      alt=""
                    />
                  </div>
                  <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                    {`${customerData?.firstName} ${customerData?.lastName} `}
                  </h1>

                  <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 rounded shadow-sm">
                    <li className="flex items-center">
                      <span className="text-xs font-semibold">
                        {customerData.position} since
                      </span>
                      <span className="ml-auto text-xs">
                        {" "}
                        {customerData?.enteredDate &&
                          formatDate(customerData?.enteredDate)}
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
                      <div className="py-2">{customerData?.firstName}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">Last Name</div>
                      <div className="py-2">{customerData?.lastName}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">Gender</div>
                      <div className="py-2">{customerData?.gender}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">Contact No.</div>
                      <div className="py-2">
                        <a
                          href={`tel:+${customerData?.phoneNo}`}
                          className="text-blue-800"
                        >
                          {customerData?.phoneNo}
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">Birthday</div>
                      <div className="py-2">
                        {" "}
                        {customerData?.birthday &&
                          formatDate(customerData?.birthday)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">Email</div>
                      <div className="py-2">
                        <a
                          className="text-blue-800"
                          href={`mailto:${customerData?.email}`}
                        >
                          {customerData?.email}
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">State</div>
                      <div className="py-2">{customerData?.state}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">Party</div>
                      <div className="py-2">{customerData?.party}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">About</div>
                      <div className="py-2">{customerData?.about}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">LGA</div>
                      <div className="py-2">{customerData?.LGAs}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">Ward</div>
                      <div className="py-2">{customerData?.ward}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">
                        Completed Project
                      </div>
                      <div className="py-2">20</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="py-2 font-semibold">Promises</div>
                      <div className="py-2">
                        {customerData?.promises.map(({ name, date }, i) => {
                          return (
                            <div key={i}>
                              <span className="mr-2">{name}</span>
                              <span className="mr-2">{date}</span>
                            </div>
                          );
                        })}
                      </div>
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

export default SinglePolitician;
