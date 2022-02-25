import { formatNumber } from "../utils";

export const DisplayCard = ({ name, qty, totalAmount }) => {
  return (
    <div className="flex flex-col justify-center max-w-xs p-6 shadow-lg rounded-xl sm:px-12 bg-gray-50 text-gray-800">
      <div className="space-y-4 text-center divide-y divide-gray-300">
        <div className="my-2 space-y-1">
          <h2 className="text-lg font-semibold text-blue-800">{name}</h2>
          <p className="px-5 text-xs  text-gray-600 font-bold">{qty}</p>
        </div>
        {totalAmount && (
          <div className="flex justify-center pt-2 space-x-4 align-center font-bold text-sm">
            {formatNumber(totalAmount)}
          </div>
        )}
      </div>
    </div>
  );
};
