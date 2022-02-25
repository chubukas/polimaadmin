import { useHistory } from "react-router-dom";

export const Goback = ({ path, location }) => {
  const history = useHistory();

  return (
    <div
      onClick={() => history.push(path)}
      className="w-100 flex flex-row cursor-pointer font-semibold text-gray-500"
    >
      <svg
        width="10"
        height="15"
        viewBox="0 0 10 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.53578 0.515015L0.0507812 9.00001L8.53578 17.485L9.95078 16.071L2.87878 9.00001L9.95078 1.92901L8.53578 0.515015Z"
          fill="#828282"
        />
      </svg>
      <p className="font-Poppins-Bold text-menu_gray text-xs ml-2">
        Back to {location}
      </p>
    </div>
  );
};
