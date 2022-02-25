export const InputBox = ({
  name,
  value,
  onChange,
  title,
  type,
  placeholder,
  disabled,
}) => {
  return (
    <>
      <label
        htmlFor={name}
        className="block text-blue-800 font-semibold text-sm"
      >
        {title}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className="form-inputs-designs"
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
    </>
  );
};
