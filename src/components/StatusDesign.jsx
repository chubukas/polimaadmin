export const StatusDesign = ({ status, color }) => {
  return (
    <span
      className={`bg-${color}-200 text-${color}-600 py-1 px-3 rounded-full text-xs font-medium`}
    >
      {status}
    </span>
  );
};
