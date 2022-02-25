export const TextArea = ({ name, value, onChange, title }) => {
  return (
    <>
      <label
        htmlFor={name}
        className="block text-blue-800 font-semibold text-sm"
      >
        {title}
      </label>
      <textarea
        id={name}
        placeholder={name}
        className="form-inputs-designs"
        name={name}
        onChange={onChange}
        value={value}
      ></textarea>
    </>
  );
};
