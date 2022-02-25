import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SearchBar = ({ OnSendSearch, onChangeInput }) => {
  return (
    <div className="w-4/5 mx-auto mt-2 ">
      <form className="flex">
        <div className="w-full sm:w-3/5">
          <div className="relative">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-3/4 transform translate-y-3/4 text-gray-400"
            />
          </div>

          <input
            className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-l-lg py-2 pl-10"
            type="text"
            aria-label="Search products"
            placeholder="Search products"
            onChange={(e) => onChangeInput(e)}
          />
        </div>

        <div className="w-32">
          <button
            className=" w-full h-full flex items-center justify-center rounded-r-lg bg-gray-800 text-white"
            type="submit"
            onClick={OnSendSearch}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};
