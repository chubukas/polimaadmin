import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const UploadImage = ({ onFileUpload, name, multiple }) => {
  return (
    <div>
      <label className="w-40 flex flex-col items-center px-4 py-6 bg-white rounded-md shadow-md tracking-wide border border-blue-100 cursor-pointer hover:bg-blue-800 hover:text-white text-blue-800 ease-linear transition-all duration-150">
        <FontAwesomeIcon icon={faCloudUploadAlt} className="fa-2x" />
        <span className="mt-2 text-sm leading-normal">Upload Image</span>
        <input
          type="file"
          className="hidden"
          name={name}
          multiple={multiple}
          onChange={onFileUpload}
        />
      </label>
    </div>
  );
};
