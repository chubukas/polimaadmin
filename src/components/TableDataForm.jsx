export const TableDataForm = ({
  type,
  name,
  value,
  onChange,
  onClick,
  textArea,
}) => {
  return (
    <>
      {!textArea ? (
        <>
          <input
            type={type}
            name={name}
            id={name}
            value={value}
            className="form-inputs-designs"
            onChange={(e) => onChange(e.target.value)}
          />

          <span
            className="text-green-800 bg-green-200 text-xs p-1 ml-2 cursor-pointer rounded"
            onClick={onClick}
          >
            Upadate
          </span>
        </>
      ) : (
        <>
          <textarea
            id={name}
            placeholder={name}
            className="form-inputs-designs"
            name={name}
            onChange={(e) => onChange(e.target.value)}
            value={value}
          ></textarea>
          <span
            className="text-green-800 bg-green-200 text-xs p-1 ml-2 cursor-pointer rounded"
            onClick={onClick}
          >
            Upadate
          </span>
        </>
      )}
    </>
  );
};
