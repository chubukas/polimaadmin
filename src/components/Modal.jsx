export const Modal = ({ setModal, children }) => {
  return (
    <div
      className="min-w-screen h-screen animated fadeIn faster fixed overflow-auto  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none"
      id="modal-id"
    >
      <div className="absolute bg-black opacity-70 inset-0 z-0"></div>
      <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white  ">
        {/* <!--content--> */}
        <div className="flex justify-center">
          {/* <!--body--> */}
          <div className="text-center p-5 flex-auto justify-center">
            {children}
          </div>
          <div
            className="bg-red-500 text-center h-5 w-5 rounded-full text-white text-xs font-semibold cursor-pointer"
            onClick={() => setModal()}
          >
            <p className="p-1 mx-auto">X</p>
          </div>
        </div>
      </div>
    </div>
  );
};
