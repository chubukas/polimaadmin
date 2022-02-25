export const SelectBox = ({ name, value, onChange, title, optionArray }) => {
  return (
    <>
      <label
        htmlFor={name}
        className="block text-blue-800 font-semibold text-sm"
      >
        {title}
      </label>
      <select
        className="form-inputs-designs bg-transparent"
        name={name}
        id={name}
        onChange={onChange}
        value={value}
      >
        <option value="">Select..</option>
        {optionArray &&
          optionArray.map((data, i) => (
            <option value={data} key={i}>
              {data}
            </option>
          ))}
      </select>
    </>
  );
};
