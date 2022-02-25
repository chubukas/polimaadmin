export const DashboardLayout = ({ children }) => {
  return (
    <div className="my-6 sm:mt-10">
      <div className="sm:w-11/12 mx-auto shadow-sm md:ml-52 md:w-9/12 lg:ml-64 xl:ml-64 2xl:ml-80">
        <div className="rounded bg-white p-10">{children}</div>
      </div>
    </div>
  );
};
