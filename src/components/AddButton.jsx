import { Link } from "react-router-dom";

export const AddButton = ({ link, name, onClick }) => {
  return (
    <div className="flex justify-end">
      {onClick ? (
        <button type="button" className="add-button" onClick={onClick}>
          {name}
          <span className="inside-add-button">New</span>
        </button>
      ) : (
        <Link to={link}>
          <button type="button" className="add-button">
            {name}
            <span className="inside-add-button">New</span>
          </button>
        </Link>
      )}
    </div>
  );
};
