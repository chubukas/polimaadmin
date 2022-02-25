export const DisplayAddedImages = ({ imagesArray, removeImage }) => {
  return (
    <>
      {imagesArray.map((image, i) => (
        <div className="relative" key={i}>
          <div>
            <img
              className="h-24 w-40 rounded-md shadow-md "
              src={URL.createObjectURL(image)}
              alt="product"
            />
          </div>
          <div className="flex justify-center absolute top-0 text-white">
            <button
              onClick={() => removeImage(i)}
              className="md:text-sm rounded px-2 py-1 text-xs bg-red-600 font-semibold"
              type="button"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
