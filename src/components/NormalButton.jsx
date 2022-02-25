export const NormalButton = ({ name, sendAction }) => {
  return (
    <div className="flex justify-center my-6">
      <button
        type="submit"
        className="form-btn px-6 py-2 font-semibold"
        onClick={sendAction}
      >
        {name}
      </button>
    </div>
  );
};
