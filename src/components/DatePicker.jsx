export const DatePicker = ({ name, value, onChange, title }) => {
  return (
    <>
      <label htmlFor={name} className="block text-blue-800 text-sm">
        {title}
      </label>
      <input
        type="date"
        name={name}
        id={name}
        className="form-inputs-designs datepicker"
        onChange={onChange}
        value={value}
      />
    </>
  );
};
