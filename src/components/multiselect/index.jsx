import { useState, useEffect } from "react";
import { faSortDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "./Dropdown";

export const Multiselect = ({ name, title, items, onChange, clear }) => {
  // state showing if dropdown is open or closed
  const [dropdown, setDropdown] = useState(false);

  // contains selected items
  const [selectedItems, setSelected] = useState([]);

  useEffect(() => {
    (() => {
      onChange(selectedItems);
    })();
  }, [selectedItems, onChange]);

  useEffect(() => {
    (() => {
      clear && setSelected([]);
    })();
  }, [clear]);

  const toogleDropdown = () => {
    setDropdown(!dropdown);
  };
  // adds new item to multiselect
  const addTag = (item) => {
    const currentItem = selectedItems.find((e) => e === item);
    if (!currentItem) setSelected(selectedItems.concat(item));
    setDropdown(false);
  };
  // removes item from multiselect
  const removeTag = (item) => {
    const filtered = selectedItems.filter((e) => e !== item);
    setSelected(filtered);
  };

  return (
    <>
      <label
        htmlFor={name}
        className="block text-blue-800 font-semibold text-sm"
      >
        {title}
      </label>
      <div className="autcomplete-wrapper">
        <div className="autcomplete">
          <div className="w-full flex flex-col items-center mx-auto">
            <div className="w-full">
              <div className="flex flex-col items-center relative">
                <div className="w-full ">
                  <div className="my-2 p-1 flex border border-gray-200 bg-white rounded ">
                    <div className="flex flex-auto flex-wrap">
                      {selectedItems.map((tag, index) => {
                        return (
                          <div
                            key={index}
                            className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-blue-200 text-blue-900 rounded-full text-teal-700 bg-teal-100 border border-teal-300 "
                          >
                            <div className="text-xs font-normal leading-none max-w-full flex-initial">
                              {tag}
                            </div>
                            <div className="flex flex-auto flex-row-reverse pl-1 ">
                              <div onClick={() => removeTag(tag)}>
                                <FontAwesomeIcon
                                  icon={faTimes}
                                  className="h-3"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div className="flex-1">
                        <div
                          className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"
                          onClick={toogleDropdown}
                        />
                      </div>
                    </div>
                    <div
                      className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200"
                      onClick={toogleDropdown}
                    >
                      <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                        <FontAwesomeIcon
                          icon={faSortDown}
                          className="h-4 w-4"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {dropdown ? (
                <Dropdown list={items} addItem={addTag}></Dropdown>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
