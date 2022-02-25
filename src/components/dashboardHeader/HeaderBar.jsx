import { Disclosure } from "@headlessui/react";
import { faBars, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { SearchBar } from "./SearchBar";
import { SideBar } from "./SideBar";

export function HeaderBar() {
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="main-bg md:bg-gray-50">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16 md:h-24">
                {/* Mobile menu button*/}
                <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faBars}
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
                {/*End of Mobile menu button*/}

                {/* Start of logo */}
                <div className="flex-1 flex items-center justify-center md:items-stretch md:justify-start">
                  <Link to="/" className="flex-shrink-0 flex items-center">
                    <img
                      className="block sm:hidden h-8 w-auto rounded-md shadow-md"
                      src="/images/logo.jpg"
                      alt="logo"
                    />
                    <img
                      className="hidden sm:block h-9 w-auto rounded-md shadow-md"
                      src="/images/logo.jpg"
                      alt="logo"
                    />
                  </Link>
                </div>
                {/* End of logo */}
                <div className="hidden md:block w-11/12 mr-auto">
                  <SearchBar />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Sidebar */}
          <Disclosure.Panel className="md:hidden">
            <SideBar />
          </Disclosure.Panel>
          {/* End Mobile Sidebar */}
        </>
      )}
    </Disclosure>
  );
}
