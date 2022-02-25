import {
  faMapMarkerAlt,
  faGlobe,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

import { formatNumber } from "../utils";

export const Reciept = ({ closeReciept }) => {
  const receiptRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: `Raxon Culler Invoice`,
    onAfterPrint: () => (window.location.href = "/Orders"),
  });

  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen bg-transparent"
        ref={receiptRef}
      >
        <div className=" bg-white shadow-lg">
          <div className="flex justify-between p-4 pb-0">
            <div>
              <img src="/images/logo.jpg" alt="logo" className="h-10 w-auto" />
              <p className="text-xs font-semibold">We are best in what we do</p>
            </div>
            <div className="p-2">
              <ul className="flex">
                <li className="flex flex-col items-center pt-2 px-3 border-l-2 border-indigo-200">
                  <FontAwesomeIcon
                    icon={faGlobe}
                    className="text-blue-800 mb-2"
                  />
                  <span className="text-xs font-semibold">
                    www.larainfo.com
                  </span>
                </li>
                <li className="flex flex-col pt-2 border-l-2 px-6 border-indigo-200 items-center">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-blue-800 mb-2"
                  />
                  <span className="text-xs font-semibold">
                    <p>No. 7 dunu kofia street,</p>
                    <p>beside southern fries chicken, </p>
                    <p>Area 11, Garki, Abuja.</p>
                  </span>
                </li>
                <li className="flex flex-col pt-2 border-l-2 px-6 border-indigo-200 items-center">
                  <FontAwesomeIcon
                    icon={faPhoneAlt}
                    className="text-blue-800 mb-2"
                  />
                  <span className="text-xs font-semibold">
                    <p className="">08138596146</p>
                    <p className="">08037025670</p>
                    <p className="">08066373375</p>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full h-0.5 bg-indigo-500"></div>
          <div className="flex justify-between p-4">
            <div>
              <h6>
                <span className="font-semibold">Order Date :</span>
                <span className="text-sm"> 12/12/2022</span>
              </h6>
              <h6>
                <span className="font-semibold">Order ID : </span>
                <span className="text-sm"> 12/12/2022</span>
              </h6>
            </div>
            <div className="w-40">
              <address className="text-sm">
                <span className="font-semibold mr-2"> Billed To : </span>
                <span>Joe doe </span>
                <p>800 Folsom Ave San Francisco, CA</p>
                <span>94107 P: + 111-456-7890</span>
              </address>
            </div>
            <div className="w-40">
              <address className="text-sm">
                <span className="font-semibold mr-2">Ship To :</span>
                <span>Joe doe </span>
                <p>800 Folsom Ave San Francisco, CA</p>
                <span>94107 P: + 111-456-7890</span>
              </address>
            </div>
            <div></div>
          </div>
          <div className="flex justify-center p-4">
            <div className="border-b border-gray-200 shadow">
              <table className="">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-xs text-gray-700 ">#</th>
                    <th className="px-4 py-2 text-xs text-gray-700 ">
                      Product Name
                    </th>
                    <th className="px-4 py-2 text-xs text-gray-700 ">
                      Quantity
                    </th>
                    <th className="px-4 py-2 text-xs text-gray-700 ">Rate</th>
                    <th className="px-4 py-2 text-xs text-gray-700 ">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="whitespace-nowrap border-b border-gray-300">
                    <td className="px-6 py-4 text-sm text-gray-700">1</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        Amazon Brand - Symactive Men's Regular Fit T-Shirt
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">4</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      &#8358; {formatNumber(20)}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-900">
                      &#8358; {formatNumber(30)}
                    </td>
                  </tr>

                  <tr className="mt-8">
                    <td colSpan="3"></td>
                    <td className="text-sm font-bold">Sub Total</td>
                    <td className="text-sm font-bold tracking-wider">
                      <b>&#8358; {formatNumber(9500)} </b>
                    </td>
                  </tr>
                  {/* <!--end tr--> */}
                  <tr>
                    <th colSpan="3"></th>
                    <td className="text-sm font-bold">
                      <b>Shipping fee</b>
                    </td>
                    <td className="text-sm font-bold">
                      <b>&#8358; {formatNumber(1500)}</b>
                    </td>
                  </tr>
                  {/* <!--end tr--> */}
                  <tr className="text-white bg-gray-800">
                    <th colSpan="3"></th>
                    <td className="text-sm font-bold">
                      <b>Total</b>
                    </td>
                    <td className="text-sm font-bold">
                      <b>&#8358; {formatNumber(9990)} </b>
                    </td>
                  </tr>
                  {/* <!--end tr--> */}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full h-0.5 bg-indigo-500"></div>
          <div className="p-4">
            <div className="flex items-center justify-center text-gray-900">
              Thank you very much for doing business with us.
            </div>
          </div>
          <div className="flex justify-between p-4">
            <div></div>
            <div className="p-4">
              <div className="flex items-end justify-end space-x-3">
                <button
                  className="px-4 py-2 text-sm text-green-600 bg-green-100"
                  onClick={handlePrint}
                >
                  Print
                </button>
                <button
                  className="px-4 py-2 text-sm text-red-600 bg-red-100"
                  onClick={closeReciept}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
